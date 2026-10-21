#!/usr/bin/env node
/**
 * Fetch a topical hero photo from Pexels for each blog post and rewrite the
 * `image:` frontmatter field to point at it.
 *
 * Why this exists: the daily blog agent used to scrape Unsplash search results
 * for an og:image tag. That scrape broke, and the agent's fallback path quietly
 * assigned Jeff's headshots and award badges to 54 unrelated posts. This uses
 * the real Pexels API instead, so a failure is loud rather than silent.
 *
 *   node scripts/fetch-blog-images.mjs [--dry-run] [--only <slug>] [--all]
 *   node scripts/fetch-blog-images.mjs --stock-bank [count]
 *   node scripts/fetch-blog-images.mjs --check-duplicates
 *
 * By default only posts listed in blog-image-queries.json are processed, and a
 * post is skipped if its image file already exists. --all re-fetches everything.
 *
 * The image bank: the remote blog agent's sandbox blocks api.pexels.com, so for
 * weeks every daily post fell back to the same ten stock photos. When a single
 * --only fetch can't reach Pexels, the script now claims the best-matching
 * unused photo from assets/blog-image-bank/ instead (pre-downloaded from Pexels
 * on a machine that can reach it, via --stock-bank). Each banked photo is used
 * once and then removed, so no two posts ever share an image.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BLOG_DIR = path.join(ROOT, 'src/content/blog')
const IMAGE_DIR = path.join(ROOT, 'public/images')
const QUERIES = path.join(ROOT, 'scripts/blog-image-queries.json')
const CREDITS = path.join(ROOT, 'src/content/blog-image-credits.json')
const BANK_DIR = path.join(ROOT, 'assets/blog-image-bank')
const BANK = path.join(ROOT, 'scripts/blog-image-bank.json')
// Below this many banked photos the agent is told to ask for a restock.
const BANK_LOW = 10

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const FORCE = args.includes('--all')
const ONLY = args.includes('--only') ? args[args.indexOf('--only') + 1] : null
// Lets the daily blog agent pass a query for a brand new post in one command,
// instead of editing blog-image-queries.json first. The query is persisted.
const QUERY = args.includes('--query') ? args[args.indexOf('--query') + 1] : null
const FROM_BANK = args.includes('--from-bank')
const STOCK_BANK = args.includes('--stock-bank')
const CHECK_DUPES = args.includes('--check-duplicates')

// Pexels serves 1x/2x renditions; large2x is 1880px wide, right for a hero.
const MIN_BYTES = 50_000

async function loadKey() {
  // The remote blog agent clones the repo without .env, so the env var wins.
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY.trim()
  const env = await fs.readFile(path.join(ROOT, '.env'), 'utf8').catch(() => '')
  const match = env.match(/^PEXELS_API_KEY=(.+)$/m)
  if (!match) throw new Error('PEXELS_API_KEY not set (env var or .env)')
  return match[1].trim()
}

async function searchPexelsPage(key, query, page) {
  const url = new URL('https://api.pexels.com/v1/search')
  url.searchParams.set('query', query)
  url.searchParams.set('orientation', 'landscape')
  url.searchParams.set('size', 'large')
  url.searchParams.set('per_page', '15')
  url.searchParams.set('page', String(page))

  const res = await fetch(url, { headers: { Authorization: key } })
  if (res.status === 429) throw new Error('rate limited by Pexels, wait and rerun')
  if (!res.ok) throw new Error(`Pexels search failed: ${res.status} ${await res.text()}`)
  const { photos = [] } = await res.json()
  return photos
}

// Only ever returns a photo no other post (or the bank) is using. Falling back
// to photos[0] here used to hand out duplicates whenever page 1 was exhausted.
async function searchPexels(key, query, usedIds, { count = 1, pages = 3 } = {}) {
  const picked = []
  let sawAny = false
  for (let page = 1; page <= pages && picked.length < count; page++) {
    const photos = await searchPexelsPage(key, query, page)
    if (!photos.length) break
    sawAny = true
    for (const p of photos) {
      if (picked.length >= count) break
      if (!usedIds.has(p.id)) picked.push(p)
    }
  }
  if (!sawAny) throw new Error(`no Pexels results for "${query}"`)
  if (!picked.length) throw new Error(`every Pexels result for "${query}" is already used, try a different query`)
  return count === 1 ? picked[0] : picked
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'))
  } catch {
    return fallback
  }
}

function words(text) {
  return new Set(text.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2))
}

// Picks the banked photo whose stock query shares the most words with this
// post's query. Ties go to the oldest entry so the bank rotates evenly.
function pickFromBank(bank, query) {
  const want = words(query ?? '')
  let best = null
  let bestScore = -1
  for (const entry of bank.photos) {
    let score = 0
    for (const w of words(entry.query)) if (want.has(w)) score++
    if (score > bestScore) {
      best = entry
      bestScore = score
    }
  }
  return best
}

async function claimFromBank(slug, query, source, credits, usedIds) {
  const bank = await readJson(BANK, { photos: [] })
  const used = new Set(Object.values(credits).map((c) => c.photoId))
  const available = bank.photos.filter((p) => !used.has(p.photoId))
  if (!available.length) {
    throw new Error('image bank is empty, restock it with --stock-bank on a machine that can reach Pexels')
  }
  const entry = pickFromBank({ photos: available }, query)
  const imageRel = `/images/${slug}.jpg`
  const imageAbs = path.join(IMAGE_DIR, `${slug}.jpg`)

  if (DRY_RUN) {
    console.log(`dry    ${slug} -> bank photo ${entry.photoId} (${entry.query})`)
    return
  }

  await fs.copyFile(path.join(BANK_DIR, entry.file), imageAbs)
  await fs.rm(path.join(BANK_DIR, entry.file))
  await fs.writeFile(path.join(BLOG_DIR, `${slug}.mdx`), rewriteFrontmatter(source, imageRel))

  bank.photos = bank.photos.filter((p) => p.photoId !== entry.photoId)
  await fs.writeFile(BANK, JSON.stringify(bank, null, 2) + '\n')

  const { file, ...credit } = entry
  credits[slug] = { ...credit, query, bankQuery: entry.query }
  usedIds.add(entry.photoId)

  const left = bank.photos.length
  console.log(`ok     ${slug} -> bank photo ${entry.photoId} by ${entry.photographer} (bank: ${left} left)`)
  if (left < BANK_LOW) {
    console.log(`BANK LOW: only ${left} photos left. Restock with: node scripts/fetch-blog-images.mjs --stock-bank`)
  }
}

async function stockBank(key, credits) {
  const bank = await readJson(BANK, { photos: [] })
  const target = Number(args[args.indexOf('--stock-bank') + 1]) || 60
  const usedIds = new Set([
    ...Object.values(credits).map((c) => c.photoId),
    ...bank.photos.map((p) => p.photoId),
  ])
  const stockQueries = bank._stockQueries ?? []
  if (!stockQueries.length) throw new Error('no _stockQueries in blog-image-bank.json')
  await fs.mkdir(BANK_DIR, { recursive: true })

  // Round-robin through the queries, two photos at a time, so the bank stays
  // varied instead of filling up with forty warehouse shots.
  let added = 0
  for (let round = 0; bank.photos.length < target && round < 5; round++) {
    for (const query of stockQueries) {
      if (bank.photos.length >= target) break
      let photos
      try {
        photos = await searchPexels(key, query, usedIds, { count: 2, pages: round + 1 })
      } catch (err) {
        console.error(`skip   "${query}": ${err.message}`)
        continue
      }
      for (const photo of photos) {
        if (bank.photos.length >= target) break
        const file = `${photo.id}.jpg`
        if (DRY_RUN) {
          console.log(`dry    bank <- ${photo.id} (${query})`)
        } else {
          try {
            await download(photo, path.join(BANK_DIR, file))
          } catch (err) {
            console.error(`skip   ${photo.id}: ${err.message}`)
            continue
          }
        }
        usedIds.add(photo.id)
        bank.photos.push({
          file,
          photoId: photo.id,
          photographer: photo.photographer,
          photographerUrl: photo.photographer_url,
          pexelsUrl: photo.url,
          query,
        })
        added++
      }
      await new Promise((r) => setTimeout(r, 400))
    }
  }

  if (!DRY_RUN) await fs.writeFile(BANK, JSON.stringify(bank, null, 2) + '\n')
  console.log(`\nadded ${added} photos, bank now holds ${bank.photos.length}`)
}

// Fails if two published posts point at the same image file.
async function checkDuplicates() {
  const byImage = new Map()
  for (const file of await fs.readdir(BLOG_DIR)) {
    if (!file.endsWith('.mdx')) continue
    const source = await fs.readFile(path.join(BLOG_DIR, file), 'utf8')
    const image = source.match(/^image:\s*"?([^"\n]+)"?/m)?.[1]
    if (!image) continue
    byImage.set(image, [...(byImage.get(image) ?? []), file.replace(/\.mdx$/, '')])
  }
  const dupes = [...byImage].filter(([, slugs]) => slugs.length > 1)
  if (!dupes.length) {
    console.log(`no duplicate images across ${byImage.size} images`)
    return
  }
  for (const [image, slugs] of dupes) console.log(`DUPLICATE ${image}: ${slugs.join(', ')}`)
  process.exitCode = 1
}

async function download(photo, destPath) {
  const src = photo.src.large2x ?? photo.src.large ?? photo.src.original
  const res = await fetch(src)
  if (!res.ok) throw new Error(`download failed: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.byteLength < MIN_BYTES) {
    throw new Error(`downloaded file only ${buf.byteLength} bytes, looks broken`)
  }
  await fs.writeFile(destPath, buf)
  return buf.byteLength
}

function rewriteFrontmatter(source, newImage) {
  const end = source.indexOf('\n---', 3)
  if (!source.startsWith('---') || end === -1) {
    throw new Error('could not locate frontmatter block')
  }
  const head = source.slice(0, end)
  const rest = source.slice(end)
  if (!/^image:/m.test(head)) throw new Error('no image: field in frontmatter')
  return head.replace(/^image:.*$/m, `image: "${newImage}"`) + rest
}

async function main() {
  if (CHECK_DUPES) return checkDuplicates()

  const queries = JSON.parse(await fs.readFile(QUERIES, 'utf8'))
  const credits = await readJson(CREDITS, {})

  if (STOCK_BANK) return stockBank(await loadKey(), credits)

  // The bank path needs no key, so a missing key only matters for Pexels.
  const key = await loadKey().catch((err) => {
    if (ONLY) return null
    throw err
  })

  if (QUERY) {
    if (!ONLY) throw new Error('--query requires --only <slug>')
    queries[ONLY] = QUERY
    await fs.writeFile(QUERIES, JSON.stringify(queries, null, 2) + '\n')
  }

  // Banked photos count as taken too, or a live fetch could grab one that the
  // bank later hands to a second post.
  const bank = await readJson(BANK, { photos: [] })
  const usedIds = new Set([
    ...Object.values(credits).map((c) => c.photoId),
    ...bank.photos.map((p) => p.photoId),
  ])
  const slugs = ONLY ? [ONLY] : Object.keys(queries).filter((k) => !k.startsWith('_'))

  // Hand-picked heroes (e.g. the featured post uses a photo of Jeff). Never
  // let an automated run replace one.
  const pinned = new Set(queries._pinned ?? [])
  if (ONLY && pinned.has(ONLY)) {
    throw new Error(
      `${ONLY} is pinned in blog-image-queries.json (_pinned) and must keep its hand-picked image. ` +
        `Remove it from _pinned first if you really want to replace it.`
    )
  }
  // A bulk run just walks past pinned posts. Throwing here made every bulk run
  // abort as soon as one pinned slug had a query defined.
  const targets = slugs.filter((slug) => !pinned.has(slug))
  const failures = []
  let updated = 0

  for (const slug of targets) {
    const query = queries[slug]
    if (!query) {
      failures.push(`${slug}: no query defined in blog-image-queries.json`)
      continue
    }

    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
    const imageRel = `/images/${slug}.jpg`
    const imageAbs = path.join(IMAGE_DIR, `${slug}.jpg`)

    const alreadyHave = await fs
      .stat(imageAbs)
      .then((s) => s.size > MIN_BYTES)
      .catch(() => false)

    if (alreadyHave && !FORCE) {
      console.log(`skip   ${slug} (image already present)`)
      continue
    }

    const source = await fs.readFile(mdxPath, 'utf8').catch(() => null)
    if (source === null) {
      failures.push(`${slug}: ${mdxPath} does not exist yet, write the post first`)
      continue
    }

    if (ONLY && (FROM_BANK || !key)) {
      try {
        await claimFromBank(slug, query, source, credits, usedIds)
        updated++
      } catch (err) {
        failures.push(`${slug}: ${err.message}`)
      }
      continue
    }

    try {
      const photo = await searchPexels(key, query, usedIds)

      if (DRY_RUN) {
        console.log(`dry    ${slug} -> ${photo.url} (${photo.photographer})`)
        usedIds.add(photo.id)
        continue
      }

      const bytes = await download(photo, imageAbs)
      await fs.writeFile(mdxPath, rewriteFrontmatter(source, imageRel))

      usedIds.add(photo.id)
      credits[slug] = {
        photoId: photo.id,
        photographer: photo.photographer,
        photographerUrl: photo.photographer_url,
        pexelsUrl: photo.url,
        query,
      }
      updated++
      console.log(`ok     ${slug} -> ${Math.round(bytes / 1024)}KB by ${photo.photographer}`)
    } catch (err) {
      // Pexels unreachable (the remote agent's sandbox blocks it): use the
      // bank rather than fail. A plain "no results" still fails so the caller
      // retries with a better query.
      const unreachable = !/no Pexels results|already used|rate limited/.test(err.message)
      if (ONLY && unreachable && !DRY_RUN) {
        console.error(`pexels unreachable (${err.message}), using the image bank`)
        try {
          await claimFromBank(slug, query, source, credits, usedIds)
          updated++
        } catch (bankErr) {
          failures.push(`${slug}: ${err.message}; bank fallback failed: ${bankErr.message}`)
          console.error(`FAIL   ${slug}: ${bankErr.message}`)
        }
      } else {
        failures.push(`${slug}: ${err.message}`)
        console.error(`FAIL   ${slug}: ${err.message}`)
      }
    }

    // Stay well inside the 200 req/hr limit.
    await new Promise((r) => setTimeout(r, 400))
  }

  if (!DRY_RUN) {
    await fs.writeFile(CREDITS, JSON.stringify(credits, null, 2) + '\n')
  }

  console.log(`\n${updated} posts updated, ${failures.length} failed`)
  if (failures.length) {
    console.log(failures.map((f) => `  - ${f}`).join('\n'))
    process.exitCode = 1
  }
}

main()

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
 *
 * By default only posts listed in blog-image-queries.json are processed, and a
 * post is skipped if its image file already exists. --all re-fetches everything.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BLOG_DIR = path.join(ROOT, 'src/content/blog')
const IMAGE_DIR = path.join(ROOT, 'public/images')
const QUERIES = path.join(ROOT, 'scripts/blog-image-queries.json')
const CREDITS = path.join(ROOT, 'src/content/blog-image-credits.json')

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const FORCE = args.includes('--all')
const ONLY = args.includes('--only') ? args[args.indexOf('--only') + 1] : null
// Lets the daily blog agent pass a query for a brand new post in one command,
// instead of editing blog-image-queries.json first. The query is persisted.
const QUERY = args.includes('--query') ? args[args.indexOf('--query') + 1] : null

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

async function searchPexels(key, query, usedIds) {
  const url = new URL('https://api.pexels.com/v1/search')
  url.searchParams.set('query', query)
  url.searchParams.set('orientation', 'landscape')
  url.searchParams.set('size', 'large')
  url.searchParams.set('per_page', '15')

  const res = await fetch(url, { headers: { Authorization: key } })
  if (res.status === 429) throw new Error('rate limited by Pexels, wait and rerun')
  if (!res.ok) throw new Error(`Pexels search failed: ${res.status} ${await res.text()}`)

  const { photos = [] } = await res.json()
  // Prefer a photo no other post is already using, so the blog index doesn't
  // show the same picture twice.
  const fresh = photos.find((p) => !usedIds.has(p.id))
  return fresh ?? photos[0] ?? null
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
  const key = await loadKey()
  const queries = JSON.parse(await fs.readFile(QUERIES, 'utf8'))

  let credits = {}
  try {
    credits = JSON.parse(await fs.readFile(CREDITS, 'utf8'))
  } catch {
    /* first run */
  }

  if (QUERY) {
    if (!ONLY) throw new Error('--query requires --only <slug>')
    queries[ONLY] = QUERY
    await fs.writeFile(QUERIES, JSON.stringify(queries, null, 2) + '\n')
  }

  const usedIds = new Set(Object.values(credits).map((c) => c.photoId))
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

    try {
      const source = await fs.readFile(mdxPath, 'utf8')
      const photo = await searchPexels(key, query, usedIds)
      if (!photo) throw new Error(`no Pexels results for "${query}"`)

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
      failures.push(`${slug}: ${err.message}`)
      console.error(`FAIL   ${slug}: ${err.message}`)
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

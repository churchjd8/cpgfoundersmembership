"use client";
import { useSyncExternalStore, useState } from "react";
import Link from "next/link";
import { dimensions, vendors, type Vendor } from "./vendors";
const base = "/cpg-match/preview";
const examplePartners = ["parker-lambert", "pom-team"];
const savedEvent = "cpg-match-saved-change";
function subscribeSaved(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(savedEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(savedEvent, callback);
  };
}
let fallbackSaved = "[]";
function readSaved() {
  try {
    return localStorage.getItem("cpg-match-saved") || fallbackSaved;
  } catch {
    return fallbackSaved;
  }
}
function useSaved() {
  const raw = useSyncExternalStore(subscribeSaved, readSaved, () => "[]");
  let saved: string[] = [];
  try {
    const value: unknown = JSON.parse(raw);
    if (Array.isArray(value))
      saved = value.filter((x): x is string => typeof x === "string");
  } catch {
    /* Invalid storage starts empty. */
  }
  function toggle(slug: string) {
    fallbackSaved = JSON.stringify(
      saved.includes(slug) ? saved.filter((x) => x !== slug) : [...saved, slug],
    );
    try {
      localStorage.setItem("cpg-match-saved", fallbackSaved);
    } catch {
      /* Keep session state. */
    }
    window.dispatchEvent(new Event(savedEvent));
  }
  return { saved, toggle };
}
function Save({
  active,
  onClick,
  name,
}: {
  active: boolean;
  onClick: () => void;
  name: string;
}) {
  return (
    <button
      className={`mp-save ${active ? "active" : ""}`}
      onClick={onClick}
      aria-label={`${active ? "Unsave" : "Save"} ${name}`}
      aria-pressed={active}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
function Avatar({ vendor }: { vendor: Vendor }) {
  return (
    <div aria-hidden="true" className={`mp-avatar ${vendor.color}`}>
      {vendor.initials}
      <span>↗</span>
    </div>
  );
}
function TierSwitch({
  preferred,
  onChange,
}: {
  preferred: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="mp-switch" aria-label="Listing preview type">
      <button
        aria-pressed={!preferred}
        className={!preferred ? "selected" : ""}
        onClick={() => onChange(false)}
      >
        Organic listing
      </button>
      <button
        aria-pressed={preferred}
        className={preferred ? "selected" : ""}
        onClick={() => onChange(true)}
      >
        ✦ Preferred example
      </button>
    </div>
  );
}
function Score({ score }: { score: number }) {
  return (
    <span className="mp-score">
      <span aria-hidden="true">★</span> {score.toFixed(1)}
      <small> / 5 quality</small>
    </span>
  );
}
export function Directory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All services");
  const [stage, setStage] = useState("All stages");
  const [preferred, setPreferred] = useState(false);
  const [onlySaved, setOnlySaved] = useState(false);
  const [sort, setSort] = useState("name");
  const { saved, toggle } = useSaved();
  const filtered = vendors
    .filter(
      (v) =>
        (category === "All services" || v.category === category) &&
        (stage === "All stages" || v.stage === stage) &&
        (!onlySaved || saved.includes(v.slug)) &&
        `${v.name} ${v.category} ${v.scope} ${v.services.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase().trim()),
    )
    .sort(
      (a, b) =>
        (preferred
          ? Number(examplePartners.includes(b.slug)) -
            Number(examplePartners.includes(a.slug))
          : 0) ||
        (sort === "quality"
          ? b.scores[0] - a.scores[0] || a.name.localeCompare(b.name)
          : a.name.localeCompare(b.name)),
    );
  function clear() {
    setQuery("");
    setCategory("All services");
    setStage("All stages");
    setOnlySaved(false);
  }
  return (
    <>
      <section className="mp-hero">
        <div className="mp-wrap">
          <div className="mp-eyebrow">
            THE PEOPLE BEHIND YOUR NEXT BIG THING
          </div>
          <h1>
            Great brands don’t
            <br />
            grow <em>alone.</em>
          </h1>
          <p>
            Find your next CPG partner. Get the inside scoop
            <br className="mp-desktop" /> from founders who have worked with
            them.
          </p>
          <div className="mp-search">
            <span aria-hidden="true">⌕</span>
            <label className="sr-only" htmlFor="vendor-search">
              Search vendors or services
            </label>
            <input
              id="vendor-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try packaging, Amazon, bookkeeping…"
            />
            <a className="mp-button" href="#vendors">
              Find a vendor <span>→</span>
            </a>
          </div>
          <div className="mp-hero-foot">
            <span>↗ Built for CPG founders</span>
            <span>◇ Firsthand experience</span>
            <span>♡ Free to explore</span>
          </div>
        </div>
        <div className="mp-hero-art" aria-hidden="true">
          <div className="mp-orbit"></div>
          <div className="mp-package package-one">
            GOOD
            <br />
            <strong>things.</strong>
            <small>START WITH GREAT PARTNERS</small>
          </div>
          <div className="mp-package package-two">
            <span>✦</span>
            <strong>
              made
              <br />
              to grow.
            </strong>
          </div>
          <div className="mp-art-note">
            A little founder wisdom
            <br />
            goes a long way. ↗
          </div>
        </div>
      </section>
      <section className="mp-wrap mp-directory" id="vendors">
        <div className="mp-section-title">
          <div>
            <div className="mp-eyebrow">YOUR NEXT GOOD CONNECTION</div>
            <h2>Explore the directory</h2>
          </div>
          <button
            className={`mp-text-button ${onlySaved ? "active" : ""}`}
            aria-pressed={onlySaved}
            onClick={() => setOnlySaved(!onlySaved)}
          >
            ♡ Saved vendors ({saved.length})
          </button>
        </div>
        <div className="mp-directory-layout">
          <aside className="mp-filters">
            <div className="mp-filter-heading">
              <strong>Find your fit</strong>
              <button onClick={clear}>Reset</button>
            </div>
            <fieldset>
              <legend>Service category</legend>
              {["All services", ...new Set(vendors.map((v) => v.category))].map(
                (c) => (
                  <label key={c}>
                    <input
                      type="radio"
                      name="category"
                      checked={category === c}
                      onChange={() => setCategory(c)}
                    />
                    <span>{c}</span>
                    <small>
                      {c === "All services"
                        ? 4
                        : vendors.filter((v) => v.category === c).length}
                    </small>
                  </label>
                ),
              )}
            </fieldset>
            <label className="mp-select-label" htmlFor="stage">
              Reviewed at this stage
            </label>
            <select
              id="stage"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
            >
              {["All stages", ...new Set(vendors.map((v) => v.stage))].map(
                (s) => (
                  <option key={s}>{s}</option>
                ),
              )}
            </select>
            <p className="mp-fine">
              Stage and spend reflect a reviewer’s project, not a vendor’s
              minimum requirements.
            </p>
            <div className="mp-help">
              <span>✳</span>
              <h3>Your experience helps the next founder.</h3>
              <p>
                The great work. The tradeoffs. The things you wish you’d known.
              </p>
              <Link href="/cpg-match#participate">Share a vendor review →</Link>
            </div>
          </aside>
          <div>
            <MatchFinder />
            <div className="mp-preview-control">
              <div>
                <strong>Compare the two experiences</strong>
                <p>Compare organic results with example preferred placement.</p>
              </div>
              <TierSwitch preferred={preferred} onChange={setPreferred} />
            </div>
            <div className="mp-results-bar">
              <p role="status">
                <strong>{filtered.length}</strong> vendors
                {onlySaved ? " saved" : " to explore"}
              </p>
              <label>
                Sort by{" "}
                <select
                  aria-label="Sort vendors"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="name">Name A–Z</option>
                  <option value="quality">Quality rating</option>
                </select>
              </label>
            </div>
            <>
              {preferred && (
                <p className="mp-placement">
                  ✦ Parker-Lambert and POM Team demonstrate preferred placement
                  above organic results. Example partnerships only; ratings are
                  unchanged.
                </p>
              )}
            </>
            <div className="mp-cards">
              {filtered.map((v) => {
                const featured = preferred && examplePartners.includes(v.slug);
                return (
                  <article
                    className={`mp-card ${featured ? "preferred" : ""}`}
                    key={v.slug}
                  >
                    {featured && (
                      <div className="mp-preferred-strip">
                        ✦ Preferred partner <span>Example placement</span>
                      </div>
                    )}
                    <div className="mp-card-body">
                      <div className="mp-card-top">
                        <Avatar vendor={v} />
                        <Save
                          name={v.name}
                          active={saved.includes(v.slug)}
                          onClick={() => toggle(v.slug)}
                        />
                      </div>
                      <div className="mp-category">{v.category}</div>
                      <h3>
                        <Link
                          href={`${base}/${v.slug}${featured ? "?tier=preferred" : ""}`}
                        >
                          {v.name} <span>↗</span>
                        </Link>
                      </h3>
                      <p className="mp-card-summary">{v.summary}</p>
                      <div className="mp-rating-line">
                        <Score score={v.scores[0]} />
                        <span>1 submitted review</span>
                      </div>
                      <div className="mp-card-facts">
                        <div>
                          <small>REVIEWER’S STAGE</small>
                          <span>{v.stage}</span>
                        </div>
                        <div>
                          <small>REPORTED SPEND</small>
                          <span>{v.cost || "Not shared"}</span>
                        </div>
                      </div>
                      <Link
                        className="mp-card-link"
                        href={`${base}/${v.slug}${featured ? "?tier=preferred" : ""}`}
                      >
                        {featured
                          ? "Explore preferred profile"
                          : "Read the founder review"}{" "}
                        <span>→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
            {!filtered.length && (
              <div className="mp-empty">
                <h3>No vendors match just yet.</h3>
                <p>
                  Try another service or reset your filters to explore the first
                  four.
                </p>
                <button className="mp-button" onClick={clear}>
                  Reset filters
                </button>
              </div>
            )}
            <p className="mp-directory-note">
              A small start, with a lot of possibility. These first four
              profiles use actual submitted feedback. More founder perspectives
              will make the directory stronger.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
export function VendorProfile({
  vendor: v,
  preferred,
}: {
  vendor: Vendor;
  preferred: boolean;
}) {
  const { saved, toggle } = useSaved();
  return (
    <div className="mp-wrap mp-profile">
      <Link className="mp-back" href={base}>
        ← Back to all vendors
      </Link>
      <div className="mp-preview-control">
        <div>
          <strong>One vendor. Two ways to show up.</strong>
          <p>Same founder feedback in both. Enhanced content in preferred.</p>
        </div>
        <div className="mp-switch">
          <Link
            className={!preferred ? "selected" : ""}
            aria-current={!preferred ? "page" : undefined}
            href={`${base}/${v.slug}`}
          >
            Organic listing
          </Link>
          <Link
            className={preferred ? "selected" : ""}
            aria-current={preferred ? "page" : undefined}
            href={`${base}/${v.slug}?tier=preferred`}
          >
            ✦ Preferred example
          </Link>
        </div>
      </div>
      {preferred && (
        <div className={`mp-profile-cover ${v.color}`}>
          <span>THE RIGHT PARTNER CHANGES EVERYTHING.</span>
          <strong>{v.summary}</strong>
          <div aria-hidden="true">✦</div>
        </div>
      )}
      <div className={`mp-profile-heading ${preferred ? "with-cover" : ""}`}>
        <Avatar vendor={v} />
        <div>
          <div className="mp-category">{v.category}</div>
          <h1>{v.name}</h1>
          <div className="mp-rating-line">
            <Score score={v.scores[0]} />
            <span>1 submitted review · Verification pending</span>
          </div>
        </div>
        <Save
          name={v.name}
          active={saved.includes(v.slug)}
          onClick={() => toggle(v.slug)}
        />
      </div>
      <div className="mp-profile-nav">
        <a href="#overview">Overview</a>
        <a href="#reviews">
          Founder review <span>1</span>
        </a>
        {preferred && <a href="#services">Services</a>}
        <span className={`mp-tier-label ${preferred ? "gold" : ""}`}>
          {preferred ? "✦ Preferred · Example" : "◇ Organically submitted"}
        </span>
      </div>
      <div className="mp-profile-layout">
        <div>
          <section className="mp-panel" id="overview">
            <div className="mp-eyebrow">GET TO KNOW THE FIT</div>
            <h2>
              {preferred
                ? "A closer look at your next partner."
                : "What a founder hired them for."}
            </h2>
            <p className="mp-lead">{v.scope}</p>
            <div className="mp-context-grid">
              <div>
                <small>COMPANY STAGE AT THE TIME</small>
                <strong>{v.stage}</strong>
              </div>
              <div>
                <small>REPORTED PROJECT SPEND</small>
                <strong>{v.cost || "Not shared"}</strong>
              </div>
              <div>
                <small>WORKED TOGETHER</small>
                <strong>{v.period}</strong>
              </div>
            </div>
            <p className="mp-fine">
              Based on one submitted experience. Reported spend is not a quote
              or a current price.
            </p>
          </section>
          {preferred && (
            <section className="mp-panel" id="services">
              <div className="mp-eyebrow">
                PREFERRED PROFILE · CONTENT PREVIEW
              </div>
              <h2>Where they can help</h2>
              <p>Services reflected in the founder’s submission.</p>
              <div className="mp-service-tags">
                {v.services.map((s) => (
                  <span key={s}>↗ {s}</span>
                ))}
              </div>
              <div className="mp-case-study">
                <span>01 / PROJECT SPOTLIGHT</span>
                <h3>{v.scope}</h3>
                <p>
                  {v.stage} · {v.period}
                </p>
                <p className="mp-fine">
                  An expanded profile can add vendor-approved project imagery,
                  an approach, and measurable outcomes here.
                </p>
              </div>
            </section>
          )}
          {preferred && (
            <>
              <section className="mp-panel">
                <div className="mp-eyebrow">
                  MEET THE TEAM · INTERVIEW PLACEHOLDER
                </div>
                <h2>The people behind {v.name}.</h2>
                <p>
                  A conversation with Nina about their approach, the brands they
                  work best with, and what a great engagement looks like.
                </p>
                <div className="mp-video">
                  <span aria-hidden="true">▷</span>
                  <strong>In conversation with {v.name}</strong>
                  <small>
                    Interview video will appear here · Not yet recorded
                  </small>
                </div>
              </section>
              <section className="mp-panel">
                <div className="mp-eyebrow">BEFORE YOU REACH OUT</div>
                <h2>Know the fit. Start a better conversation.</h2>
                <p>
                  Sample interview questions for the expanded profile. Answers
                  and current pricing will be supplied by the vendor.
                </p>
                {[
                  "Who is your ideal client, and who is not a fit?",
                  "What does a typical engagement cost?",
                  "What happens in the first 30 days?",
                  "What is a client success story you’re proud of?",
                ].map((q) => (
                  <details key={q}>
                    <summary>{q}</summary>
                    <p>
                      Vendor interview answer coming here. Nina’s conversation
                      will turn this into specific, useful guidance for
                      founders.
                    </p>
                  </details>
                ))}
                <p className="mp-fine">
                  {v.cost
                    ? `The founder reported ${v.cost} for their project. Current pricing, billing basis, and minimum commitments are not yet confirmed.`
                    : "Current pricing and minimum commitments are not yet supplied."}
                </p>
              </section>
            </>
          )}
          <section className="mp-panel" id="reviews">
            <div className="mp-review-heading">
              <div>
                <div className="mp-eyebrow">THE FOUNDER PERSPECTIVE</div>
                <h2>Beyond a star rating.</h2>
              </div>
              <span className="mp-count">1 review</span>
            </div>
            <p>
              Six things that matter when you’re trusting someone with your
              brand.
            </p>
            <div className="mp-score-grid">
              {dimensions.map((d, i) => (
                <div className="mp-dimension" key={d}>
                  <span>{d}</span>
                  <div className="mp-bar" aria-hidden="true">
                    <i style={{ width: `${v.scores[i] * 20}%` }} />
                  </div>
                  <strong>
                    {v.scores[i].toFixed(1)}
                    <small> / 5</small>
                  </strong>
                </div>
              ))}
            </div>
            <div className="mp-review">
              <div className="mp-review-author">
                <span className="mp-founder-avatar">F</span>
                <div>
                  <strong>CPG founder</strong>
                  <p>Identity withheld in preview · Verification pending</p>
                </div>
              </div>
              <h3>“{v.scope}”</h3>
              {v.bestFor && (
                <>
                  <h4>Who they’re a fit for / what stood out</h4>
                  <blockquote>“{v.bestFor}”</blockquote>
                </>
              )}
              <div className="mp-return">
                <span>↻</span>
                <div>
                  <strong>Very disappointed if they were unavailable</strong>
                  <p>
                    The founder’s response when asked about needing similar work
                    again.
                  </p>
                </div>
              </div>
              <p className="mp-fine">
                {v.stage} · Worked together: {v.period}
              </p>
            </div>
            <Link className="mp-text-link" href="/cpg-match#participate">
              Worked with {v.name}? Add your experience →
            </Link>
          </section>
        </div>
        <aside className="mp-profile-sidebar">
          <div className={`mp-contact ${preferred ? "preferred" : ""}`}>
            <span className="mp-eyebrow">
              {preferred
                ? "✦ MEET YOUR NEXT PARTNER"
                : "A FOUNDER’S STARTING POINT"}
            </span>
            <h2>
              {preferred
                ? "Good fit? Let’s connect."
                : "Start with the experience."}
            </h2>
            <p>
              {preferred
                ? "A preferred profile gives founders a direct path to a conversation."
                : "Read the founder’s experience, then send a simple connection request."}
            </p>
            <ContactPreview preferred={preferred} name={v.name} />
            <p className="mp-fine">
              {preferred
                ? "Example partner status. No commercial relationship is asserted."
                : "An organic listing is built from submitted founder feedback."}
            </p>
          </div>
          <div className="mp-trust">
            <h3>Trust is the whole point.</h3>
            <p>Founder feedback stays the same across both listing types.</p>
            <p>
              Preferred placement would be disclosed alongside any fee or
              referral relationship.
            </p>
            <p className="mp-fine">
              For this preview, all four vendors can be viewed in either layout.
              Verification and partner agreements are still to be confirmed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ContactPreview({
  preferred,
  name,
}: {
  preferred: boolean;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <>
      <button
        className="mp-button"
        onClick={() => {
          setOpen(!open);
          setDone(false);
        }}
        aria-expanded={open}
      >
        {preferred ? "Find out if you’re a fit" : "Connect with this vendor"}{" "}
        <span>↗</span>
      </button>
      {open && (
        <form
          className="mp-intro-preview"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <strong>
            {preferred
              ? "A little context. A better introduction."
              : `Connect with ${name}`}
          </strong>
          <p>Sample form only. Nothing is sent or stored.</p>
          <label>
            Your name
            <input required autoComplete="name" />
          </label>
          <label>
            Work email
            <input type="email" required autoComplete="email" />
          </label>
          {preferred && (
            <>
              <label>
                Company stage
                <select required defaultValue="">
                  <option value="" disabled>
                    Select your stage
                  </option>
                  {[
                    "Pre-revenue",
                    "Under $1M",
                    "$1M–$5M",
                    "$5M–$20M",
                    "$20M+",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label>
                Budget ceiling (optional)
                <select defaultValue="">
                  <option value="">Still exploring</option>
                  {["Under $5K", "$5K–$15K", "$15K–$50K", "$50K+"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </>
          )}
          <label>
            {preferred
              ? "What would a successful project look like?"
              : "How can they help?"}
            <textarea required rows={3} />
          </label>
          <button className="mp-button" type="submit">
            Preview request →
          </button>
          {done && (
            <p role="status">
              That’s the experience:{" "}
              {preferred
                ? "a project brief with stage and budget context"
                : "a simple connection request"}
              . Demo complete — nothing was sent.
            </p>
          )}
        </form>
      )}
    </>
  );
}
function MatchFinder() {
  const [need, setNeed] = useState("");
  const [result, setResult] = useState<Vendor[] | null>(null);
  return (
    <details className="mp-assistant">
      <summary>
        ✦ Not sure where to start? Try the match guide <span>→</span>
      </summary>
      <p>
        Preview of the future AI conversation. This demo uses keyword matching
        across the four submitted vendors, with no paid ranking.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const words = need
            .toLowerCase()
            .split(/[^a-z0-9]+/)
            .filter(
              (w) =>
                w.length > 2 &&
                ![
                  "the",
                  "for",
                  "need",
                  "help",
                  "with",
                  "looking",
                  "and",
                  "want",
                  "someone",
                  "our",
                ].includes(w),
            );
          setResult(
            vendors.filter((v) =>
              words.some((w) =>
                `${v.category} ${v.scope} ${v.summary}`
                  .toLowerCase()
                  .includes(w),
              ),
            ),
          );
        }}
      >
        <label className="sr-only" htmlFor="match-need">
          What do you need help with?
        </label>
        <input
          id="match-need"
          required
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          placeholder="I need help with packaging for my brand…"
        />
        <button className="mp-button" type="submit">
          Show possible matches →
        </button>
      </form>
      {result && (
        <div role="status">
          {result.length ? (
            <>
              <p>
                These submitted services may be relevant. Review their project
                context to judge your fit.
              </p>
              {result.map((v) => (
                <p key={v.slug}>
                  <Link className="mp-text-link" href={`${base}/${v.slug}`}>
                    {v.name} →
                  </Link>{" "}
                  {v.scope}
                </p>
              ))}
            </>
          ) : (
            <p>
              No clear match among these four vendors yet. Try Amazon,
              bookkeeping, Instacart, or packaging.
            </p>
          )}
        </div>
      )}
    </details>
  );
}

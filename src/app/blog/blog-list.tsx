"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { BlogPost } from "@/lib/blog";

const CATEGORIES: { label: string; keywords: string[] }[] = [
  {
    label: "Fundraising",
    keywords: ["fundraising", "investor", "cap table", "pitch", "raise", "equity", "dilution", "valuation"],
  },
  {
    label: "Retail & Distribution",
    keywords: ["retail", "distribution", "whole foods", "walmart", "costco", "kroger", "target", "channel", "drug", "broker", "shelf", "slotting"],
  },
  {
    label: "Operations",
    keywords: ["operations", "supply chain", "co-manufacturing", "co-man", "manufacturing", "3pl", "logistics", "production", "vertical integration"],
  },
  {
    label: "Margin & Cash",
    keywords: ["gross margin", "margin", "pricing", "trade spend", "working capital", "cash flow", "p&l", "deduction", "chargeback", "penny profit"],
  },
  {
    label: "Brand & Marketing",
    keywords: ["brand", "marketing", "dtc", "amazon", "packaging", "velocity", "positioning", "consumer", "loyalty", "repeat purchase", "media"],
  },
  {
    label: "Growth & Strategy",
    keywords: ["growth", "strategy", "scaling", "exit", "m&a", "leadership", "board", "founder", "turnaround", "pivot", "sku rationalization"],
  },
];

function matchesCategory(post: BlogPost, category: typeof CATEGORIES[number]) {
  const haystack = [post.title, post.description, ...post.tags].join(" ").toLowerCase();
  return category.keywords.some((kw) => haystack.includes(kw));
}

function matchesQuery(post: BlogPost, query: string) {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  return (
    post.title.toLowerCase().includes(q) ||
    post.description.toLowerCase().includes(q) ||
    post.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function BlogList({
  posts,
  postsPerPage,
}: {
  posts: BlogPost[];
  postsPerPage: number;
}) {
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const featuredPost = posts.find((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  const activeCategoryDef = CATEGORIES.find((c) => c.label === activeCategory);

  const filteredPosts = regularPosts.filter((p) => {
    if (activeCategoryDef && !matchesCategory(p, activeCategoryDef)) return false;
    if (!matchesQuery(p, query)) return false;
    return true;
  });

  const isFiltering = !!activeCategory || !!query.trim();
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  const showFeatured = featuredPost && page === 1 && !isFiltering;

  function resetFilters() {
    setActiveCategory(null);
    setQuery("");
    setPage(1);
  }

  return (
    <>
      {/* Filter bar: search + category chips */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search posts by title, topic, or keyword..."
            aria-label="Search blog posts"
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-border rounded-lg bg-card placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setActiveCategory(null);
              setPage(1);
            }}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
              activeCategory === null
                ? "bg-accent text-white"
                : "border border-border text-muted hover:bg-card hover:text-foreground"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => {
                setActiveCategory(cat.label === activeCategory ? null : cat.label);
                setPage(1);
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                cat.label === activeCategory
                  ? "bg-accent text-white"
                  : "border border-border text-muted hover:bg-card hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        {isFiltering && (
          <p className="text-xs text-muted">
            {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
            {activeCategory ? ` in ${activeCategory}` : ""}
            {query.trim() ? ` matching "${query.trim()}"` : ""}
            {" · "}
            <button
              onClick={resetFilters}
              className="text-accent hover:underline"
            >
              clear filters
            </button>
          </p>
        )}
      </div>

      {/* Featured post */}
      {showFeatured && featuredPost && (
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="group block rounded-xl border border-accent/30 ring-2 ring-accent/20 bg-card overflow-hidden hover:shadow-lg transition-shadow mb-10"
        >
          <div className="grid md:grid-cols-2">
            {featuredPost.image && (
              <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[360px] overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <span className="inline-block self-start px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full mb-4">
                Featured
              </span>
              <div className="flex items-center gap-3 text-xs text-muted mb-3">
                <time dateTime={featuredPost.date}>
                  {new Date(featuredPost.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>&middot;</span>
                <span>{featuredPost.readingTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold group-hover:text-accent transition-colors">
                {featuredPost.title}
              </h2>
              <p className="mt-3 text-muted line-clamp-3">
                {featuredPost.description}
              </p>
              {featuredPost.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs bg-background rounded-full text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Link>
      )}

      {/* Regular posts grid */}
      {paginatedPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
            >
              {post.image && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted mb-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>&middot;</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-lg font-bold group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted line-clamp-3">
                  {post.description}
                </p>
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-background rounded-full text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        isFiltering && (
          <p className="text-muted text-center py-12">
            No posts match your filters.{" "}
            <button
              onClick={resetFilters}
              className="text-accent hover:underline"
            >
              View all posts
            </button>
          </p>
        )
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={() => {
              setPage((p) => Math.max(1, p - 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-card transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            &larr; Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                p === page
                  ? "bg-accent text-white"
                  : "border border-border hover:bg-card"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => {
              setPage((p) => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-card transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
}

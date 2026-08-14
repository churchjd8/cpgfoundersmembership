"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";

type Choice = "A" | "B" | "C";

const COVERS: { id: Choice; note: string; src: string }[] = [
  { id: "A", note: "Green", src: "/images/book-covers/cover-a.jpg" },
  { id: "B", note: "Cream", src: "/images/book-covers/cover-b.jpg" },
  { id: "C", note: "Citrus", src: "/images/book-covers/cover-c.jpg" },
];

// The vote lives on the device: it lets someone change their mind without
// letting them vote three times.
const VOTER_KEY = "cpg_cover_voter_id";
const CHOICE_KEY = "cpg_cover_choice";
const OPTIN_KEY = "cpg_cover_optin";

function readVoterId() {
  try {
    const existing = localStorage.getItem(VOTER_KEY);
    if (existing) return existing;
    const fresh = crypto.randomUUID();
    localStorage.setItem(VOTER_KEY, fresh);
    return fresh;
  } catch {
    return crypto.randomUUID();
  }
}

export function CoverPoll() {
  const [selected, setSelected] = useState<Choice | null>(null);
  const [voted, setVoted] = useState(false);
  const [voting, setVoting] = useState(false);
  const [voteError, setVoteError] = useState(false);
  const [zoom, setZoom] = useState<Choice | null>(null);
  const [optedIn, setOptedIn] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "error">("idle");

  // Pre-select whatever this device picked last time.
  useEffect(() => {
    try {
      const prior = localStorage.getItem(CHOICE_KEY);
      if (prior === "A" || prior === "B" || prior === "C") setSelected(prior);
      if (localStorage.getItem(OPTIN_KEY)) setOptedIn(true);
    } catch {
      /* private browsing — start fresh */
    }
  }, []);

  // Close the zoom overlay with the escape key.
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  async function castVote() {
    if (!selected || voting) return;
    setVoting(true);
    setVoteError(false);

    try {
      const res = await fetch("/api/book-cover-vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterId: readVoterId(), choice: selected }),
      });

      if (!res.ok) throw new Error("vote failed");

      setVoted(true);
      try {
        localStorage.setItem(CHOICE_KEY, selected);
      } catch {
        /* ignore */
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setVoteError(true);
    } finally {
      setVoting(false);
    }
  }

  async function handleOptIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/book-cover-vote", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voterId: readVoterId(),
          name: data.get("first_name"),
          email: data.get("email"),
          comment: data.get("comment"),
        }),
      });

      if (!res.ok) throw new Error("signup failed");

      setOptedIn(true);
      try {
        localStorage.setItem(OPTIN_KEY, "1");
      } catch {
        /* ignore */
      }
    } catch {
      setFormStatus("error");
    }
  }

  const zoomCover = COVERS.find((c) => c.id === zoom);
  const votedCover = COVERS.find((c) => c.id === selected);

  return (
    <>
      {/* ========== HEADER ========== */}
      <div className="text-center">
        <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full">
          {voted ? "Vote counted" : "Help Jeff choose"}
        </span>
        <h1 className="mt-5 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
          {voted ? "Thank you" : "Pick the cover"}
        </h1>
        {voted ? (
          <p className="mt-3 text-muted">
            You picked <span className="font-semibold text-foreground">Cover {selected}</span>. Jeff
            sees every vote.
          </p>
        ) : (
          <>
            <p className="mt-3 text-lg font-semibold">The Cold-Pressed Truth</p>
            <p className="mt-1 text-muted leading-snug">
              A Founder&rsquo;s Field Guide to Building, Scaling &amp; Selling a Consumer Brand
            </p>
            <p className="mt-1 text-sm text-muted">Foreword by Jay Shetty</p>
            <p className="mt-6 text-muted">Tap the one you like best, then hit vote.</p>
          </>
        )}
      </div>

      {/* ========== VOTE ========== */}
      {!voted && (
        <>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4">
            {COVERS.map((cover) => {
              const isSelected = selected === cover.id;
              return (
                <div key={cover.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setSelected(cover.id)}
                    aria-pressed={isSelected}
                    aria-label={`Choose Cover ${cover.id}`}
                    className={`group block w-full rounded-2xl overflow-hidden bg-white transition-all ${
                      isSelected
                        ? "ring-4 ring-accent shadow-xl scale-[1.01]"
                        : "ring-1 ring-border shadow-sm hover:shadow-lg hover:ring-accent/40"
                    }`}
                  >
                    {/* The hairline keeps the cream cover from dissolving into
                        the white card and reading smaller than the other two. */}
                    <span className="relative block">
                      <Image
                        src={cover.src}
                        alt={`Cover ${cover.id} — ${cover.note}`}
                        width={825}
                        height={1280}
                        priority
                        className="block w-full h-auto"
                      />
                      <span className="pointer-events-none absolute inset-0 border border-black/15" />
                    </span>
                    <span
                      className={`flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                        isSelected ? "bg-accent text-white" : "bg-white text-foreground"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      Cover {cover.id}
                    </span>
                  </button>

                  {/* Full-screen look, since this is a judgment call about art. */}
                  <button
                    type="button"
                    onClick={() => setZoom(cover.id)}
                    aria-label={`Enlarge Cover ${cover.id}`}
                    className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/45 text-white backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-4 mt-8 z-10">
            <button
              type="button"
              onClick={castVote}
              disabled={!selected || voting}
              className="w-full px-8 py-4 bg-accent hover:bg-accent-dark disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg transition-colors text-lg"
            >
              {voting
                ? "Sending..."
                : selected
                  ? `Vote for Cover ${selected}`
                  : "Select a cover to vote"}
            </button>
          </div>

          {voteError && (
            <p className="mt-3 text-center text-sm text-red-600">
              That didn&rsquo;t go through. Please try again.
            </p>
          )}
        </>
      )}

      {/* ========== CONFIRMATION + OPT-IN ========== */}
      {/* Running totals stay private — voters shouldn't be swayed by the pack. */}
      {voted && (
        <>
          {votedCover && (
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
              <span className="relative block shrink-0">
                <Image
                  src={votedCover.src}
                  alt={`Cover ${votedCover.id}`}
                  width={825}
                  height={1280}
                  className="block h-20 w-auto rounded shadow-sm"
                />
                <span className="pointer-events-none absolute inset-0 rounded border border-black/15" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-accent">
                  Your vote is in
                </p>
                <p className="mt-1 font-serif text-xl font-bold">Cover {votedCover.id}</p>
                <button
                  type="button"
                  onClick={() => setVoted(false)}
                  className="mt-1 text-sm text-muted underline underline-offset-4 hover:text-accent"
                >
                  Change my vote
                </button>
              </div>
            </div>
          )}

          {optedIn ? (
            <div className="mt-6 rounded-2xl bg-accent-light border border-accent/20 p-6 text-center">
              <p className="text-3xl">📚</p>
              <p className="mt-3 font-semibold">You&rsquo;re on the list.</p>
              <p className="mt-1 text-muted text-sm">
                You&rsquo;ll get the first look at The Cold-Pressed Truth before it goes public.
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-foreground text-white p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-bold">Want the first look?</h2>
              <p className="mt-2 text-white/70 leading-relaxed">
                Leave your email and you&rsquo;ll hear the day the book launches, plus exclusive
                early access before anyone else.
              </p>
              <form onSubmit={handleOptIn} className="mt-5 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    name="first_name"
                    required
                    autoComplete="given-name"
                    placeholder="First name"
                    className="flex-1 min-w-0 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@yourbrand.com"
                    className="flex-1 min-w-0 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <input
                  type="text"
                  name="comment"
                  placeholder="Why that cover? (optional)"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full px-6 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {formStatus === "loading" ? "Adding..." : "Notify me at launch"}
                </button>
              </form>
              {formStatus === "error" && (
                <p className="mt-3 text-sm text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}
              <p className="mt-3 text-xs text-white/40">
                No spam. Just the book. Your vote is already counted either way.
              </p>
            </div>
          )}
        </>
      )}

      {/* ========== ZOOM ========== */}
      {zoomCover && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Cover ${zoomCover.id} enlarged`}
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <Image
            src={zoomCover.src}
            alt={`Cover ${zoomCover.id} — ${zoomCover.note}`}
            width={825}
            height={1280}
            className="max-h-[88vh] w-auto rounded-lg shadow-2xl"
          />
          <button
            type="button"
            onClick={() => setZoom(null)}
            aria-label="Close"
            className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/15 text-white text-2xl leading-none flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}

# Voice Profile Builder — Instructions for Claude Code

## Overview

This playbook builds a comprehensive writing voice profile for any client by analyzing their written material in depth. The profile becomes the foundation for ALL future content creation — blog posts, emails, LinkedIn, social media, etc.

The profile is a living document. Every time new source material is added, the profile should be refined and sharpened — not rebuilt from scratch, but layered with new patterns, corrected where earlier assumptions were wrong, and deepened where new material reveals nuance the original sources didn't capture.

---

## Step 1: Gather the Source Material

Drop the client's written material into the project root. The more variety, the better:

- **Book manuscript or long-form writing** (the polished voice)
- **Whitepapers, articles, or blog posts** (the professional voice)
- **Transcripts, emails, or social posts** (the raw/conversational voice)
- **Speeches, podcast transcripts, interviews** (the unfiltered voice)

The key is getting at least 2 different formats so you can map the range between their polished and unfiltered voice. More source material = better profile. Different formats matter more than volume — a book + a few emails/transcripts reveals more range than two books.

**If you have audio/video**, get transcripts first (Otter.ai works great) and include those — transcripts capture the raw conversational voice that polished writing hides.

---

## Step 2: Initial Profile Build

Paste this prompt into Claude Code once the files are in the project:

```
I need you to build a comprehensive writing voice profile for [CLIENT NAME] by analyzing their source material in depth. This profile will be used as the foundation for ALL future content creation — blog posts, emails, LinkedIn, social media, etc.

Source files to analyze:
- [list the file names and what they are, e.g. "manuscript.pdf — 200-page book manuscript"]
- [e.g. "whitepaper.pdf — 15-page industry whitepaper"]
- [e.g. "transcript.txt — podcast interview transcript"]

Run 3 parallel analysis agents on the source material:

**Agent 1 — Voice & Style Analysis**
Analyze ALL source material for:
- Tone & register (how formal/casual, how they balance authority with warmth)
- Sentence structure patterns (short vs long, fragments, rhythm)
- Signature constructions (contrasting pairs, reversals, repeated phrasings)
- Point of view (first person, direct address, inclusive "we", etc.)
- What they do NOT do (anti-patterns to avoid)

**Agent 2 — Content & Substance Analysis**
Analyze ALL source material for:
- How they use stories and anecdotes (length, structure, purpose)
- How they handle data and numbers (academic vs conversational)
- Recurring motifs, metaphors, and key phrases (extract exact quotes)
- Core business aphorisms and one-liners they return to
- Emotional/personal motifs and values that come through
- Background details that shape their perspective

**Agent 3 — Structural & Format Analysis**
Analyze ALL source material for:
- Long-form structural approach (how they open, build, and close pieces)
- Short-form structural approach (how the voice changes in shorter formats)
- Voice calibration by format (create a table: format | tone | story depth | polish level | vulnerability)
- How their voice differs between polished (book) vs raw (whitepapers/transcripts) formats

After all 3 agents complete, synthesize their findings into a single comprehensive voice profile document with these sections:

1. TONE & REGISTER
2. SENTENCE STRUCTURE
3. SIGNATURE CONSTRUCTIONS & PATTERNS
4. HOW THEY USE STORIES & ANECDOTES
5. HOW THEY HANDLE DATA & NUMBERS
6. POINT OF VIEW
7. EMOTIONAL REGISTER
8. RECURRING MOTIFS & KEY PHRASES
9. WHAT [CLIENT NAME] DOES NOT DO
10. LONG-FORM STRUCTURAL APPROACH
11. SHORT-FORM STRUCTURAL APPROACH
12. VOICE CALIBRATION BY FORMAT (table)
13. BACKGROUND THAT SHAPES THE VOICE

For each section, include specific quotes pulled directly from the source material as examples. The profile should be detailed enough that someone reading it could write convincingly in this person's voice without ever having met them.

Save the completed profile as:
1. A file in the project root: [client_name]_voice_profile.md
2. A memory file so it persists across conversations

Then confirm with me before committing.
```

---

## Step 3: Continuous Refinement (Every Time New Material Is Added)

Whenever new source material is added to the project (new transcripts, new blog posts, new emails, new interviews, etc.), use this prompt to refine the existing profile:

```
I've added new source material for [CLIENT NAME]'s voice profile:
- [list new files and what they are]

Analyze this new material against the existing voice profile in [client_name]_voice_profile.md. Run 3 parallel analysis agents:

**Agent 1 — New Patterns & Discoveries**
Read the new material and identify:
- Any voice patterns, phrases, or constructions NOT already captured in the profile
- New aphorisms, one-liners, or recurring phrases
- New stories or anecdotes that reveal voice characteristics
- Any shifts in tone, register, or style compared to earlier material

**Agent 2 — Corrections & Adjustments**
Compare the new material against the existing profile and identify:
- Anything in the current profile that the new material contradicts or nuances
- Patterns we thought were consistent that turn out to be context-dependent
- Areas where the profile was too broad or too narrow based on new evidence
- Voice characteristics that are stronger or weaker than we originally assessed

**Agent 3 — Deepening & Layering**
Look for:
- Richer examples that better illustrate existing profile points (replace weaker examples with stronger ones)
- New format-specific voice data (e.g., if we now have email samples we didn't before)
- Deeper understanding of emotional register, vulnerability patterns, humor style
- New background details that shape the voice

After all 3 agents complete, update the voice profile:
- ADD new patterns and phrases discovered
- CORRECT anything the new material contradicts
- REPLACE weaker examples with stronger ones from the new material
- DEEPEN sections where new material adds nuance
- UPDATE the "sources analyzed" list at the top to include the new material
- DO NOT remove anything that's still accurate — only refine and add

Save the updated profile to both the project root file and the memory file. Show me a summary of what changed.
```

---

## Notes

- **PDF manuscripts work** — Claude Code can read PDFs directly, just reference the file path
- **The profile is never "done"** — it should get sharper and more accurate with every piece of new material. Think of it like training a model: more data = better output.
- **Quality of source material matters** — one raw, unfiltered transcript can reveal more about someone's real voice than 50 pages of ghostwritten content
- **Always use the voice profile for ALL content creation** — blog posts, emails, LinkedIn posts, social media, website copy, everything. Never fall back to generic AI voice.
- **Social media should feel like a transcribed voice note**, not polished copy. The profile's short-form section is specifically calibrated for this.

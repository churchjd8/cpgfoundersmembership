# Voice Engine Methodology

## How to Build a Client Voice Profile from Source Material

This is the playbook for analyzing uploaded content (manuscripts, blog posts, whitepapers, transcripts, emails, social posts) and generating a comprehensive, reusable voice profile.

---

## Step 1: Gather Source Material

Upload as much of the person's **own writing and speaking** as possible. More = better. Prioritize:

| Priority | Source Type | Why It Matters |
|----------|-----------|----------------|
| 1 | Books / manuscripts / whitepapers | Shows natural structure, story patterns, argument building |
| 2 | Blog posts / articles | Shows teaching voice and how they frame lessons |
| 3 | LinkedIn posts / social media | Shows casual register, how they compress ideas |
| 4 | Emails / newsletters | Shows direct communication style |
| 5 | Transcripts (podcasts, talks, Otter.ai) | Shows how they actually talk vs. write |
| 6 | Presentation decks | Shows how they frame ideas and what frameworks they lean on |

**Minimum viable input:** ~10,000 words across at least 2 formats.
**Ideal input:** 50,000+ words across 3+ formats.

---

## Step 2: Multi-Agent Parallel Analysis

When source material is uploaded, spin up **5 specialized agents in parallel**. Each agent has a single analytical focus. Specialization beats one agent trying to track everything at once.

### Why 5 Agents Instead of 1

- A single agent reading 200 pages loses the thread. By page 150 it's forgotten patterns from page 20.
- Specialization creates depth. An agent looking ONLY for stories catches ones a generalist skims past.
- Anti-patterns need dedicated attention. What someone doesn't do is easy to miss unless you're specifically hunting for it.
- Parallel = faster. Five agents running simultaneously vs. one sequential pass.

---

### Agent 1: Tone & Emotional Register

**Focus:** How does this person come across emotionally and interpersonally?

Analyze:
- Overall tone — warm? blunt? academic? casual? authoritative? conversational?
- Emotional temperature — vulnerable, guarded, confident, self-deprecating, urgent?
- How tone shifts between formats (if multiple formats provided)
- What emotions show up and how they're expressed
- Relationship to the reader — peer? mentor? expert? guide? coach?
- How they handle hard truths — sugarcoat, soften with empathy, deliver bluntly?
- Humor style — self-deprecating, dry, absent, situational?
- Confidence calibration — how do they balance pride and humility?

**Output:** Pull 10-15 direct quotes as evidence for each pattern identified.

---

### Agent 2: Sentence Structure & Linguistic Patterns

**Focus:** The mechanics of how they write at the sentence level.

Analyze:
- Short vs. long sentence ratio and rhythm patterns
- Fragment usage — intentional for emphasis or accidental?
- Signature grammatical constructions (contrasting pairs, reversals, stacked short lines, rhetorical questions)
- Punctuation habits — em-dashes, ellipses, quotation marks for emphasis, exclamation points, parenthetical asides
- How they handle transitions between ideas
- Active vs. passive voice ratio
- Imperative/command usage in advice-giving
- Paragraph length and white space patterns
- Vocabulary level — SAT words or plain English?

**Output:** Pull 10-15 direct quotes as evidence. Note which patterns appear in which formats.

---

### Agent 3: Story Bank & Anecdote Extraction

**Focus:** Every story, anecdote, and personal example — cataloged completely.

Analyze and catalog:
- Every story and anecdote found in the source material
- For each story: what happened, who was involved (named people), what lesson it serves, how long it runs
- Recurring anchor stories — the ones they return to across multiple pieces (these are load-bearing and should be reused)
- How deep stories go in different formats (full narrative vs. compressed to one sentence)
- Sensory details and scene-setting patterns
- Whether stories are always personal or include others' stories too
- The story-to-lesson connection — how they bridge from narrative to principle
- Named people — who gets mentioned and in what context (collaborators, mentors, clients, competitors)

**Output:** Pull the actual stories with full context, not summaries. Organize by theme/lesson.

---

### Agent 4: Frameworks, Aphorisms & Data Patterns

**Focus:** The intellectual building blocks — phrases, numbers, models, and principles.

Analyze and catalog:
- Every quotable phrase, saying, or aphorism (these become the voice's "greatest hits")
- Numbered frameworks and models they've built (e.g., "5 Fatal Flaws," "8-Step Process")
- How they use data and numbers — academic citations vs. woven in naturally
- Specific benchmarks and thresholds they return to repeatedly
- Financial/technical vocabulary and how they explain it (insider jargon vs. accessible)
- Key principles that show up more than once — these are load-bearing ideas, not throwaway lines
- Metaphors and analogies they favor
- How they organize information — categories, tiers, sequences, hierarchies

**Output:** Separate lists for aphorisms, frameworks, recurring benchmarks, and key principles. Note frequency — how many times each appears across the source material.

---

### Agent 5: Structure & Anti-Patterns

**Focus:** How pieces are built, and what this person never does.

Analyze:
- How do they open a piece? (Story? Question? Bold claim? Data point?)
- How do they close? (Callback? One-liner? CTA? Reflection?)
- What's the architecture of a typical piece — the skeleton structure?
- How does structure shift across formats (long-form vs. blog vs. social vs. email)?
- Point of view — first person, direct address, inclusive "we," third person?
- How they position themselves relative to the reader (above, beside, below)
- **Anti-patterns — what do they NOT do?** This is critical:
  - Words or phrases they never use
  - Tones they avoid
  - Structural choices they never make
  - Things that would break the voice if included
- CTAs and calls to action — how do they ask the reader to do something?
- How they handle expertise — do they explain everything or assume knowledge?

**Output:** Structural templates for each format. Explicit list of anti-patterns with reasoning.

---

## Step 3: Synthesis

After all 5 agents return results, synthesize into one unified voice profile document:

1. **Cross-reference** — where do multiple agents identify the same pattern? Those are the strongest signals.
2. **Resolve contradictions** — if Agent 1 says "casual" but Agent 2 shows complex sentence structures, note the nuance (e.g., "casual tone with sophisticated construction").
3. **Organize into the master template** (see below).
4. **Build the calibration table** — how does the voice shift across formats?
5. **Write the "What They Don't Do" section** — this is as important as what they do.

---

## Step 4: Master Voice Profile Template

The final output should be a markdown file structured like this:

```markdown
---
name: [Client Name] Writing Voice Profile
description: Voice and style guide for [client] — use for all content creation
type: user
---

## Voice Profile — [Client Name]

### Sources Analyzed
[List all source materials with word counts]

### TONE & REGISTER
[From Agent 1]

### SENTENCE STRUCTURE
[From Agent 2]

### SIGNATURE CONSTRUCTIONS & PATTERNS
[From Agents 2 + 4]

### HOW THEY USE STORIES & ANECDOTES
[From Agent 3]

### STORY BANK
[From Agent 3 — the actual stories, organized by theme]

### HOW THEY HANDLE DATA & NUMBERS
[From Agent 4]

### CORE FRAMEWORKS & PRINCIPLES
[From Agent 4 — the load-bearing ideas they return to]

### APHORISM BANK
[From Agent 4 — quotable phrases to use naturally in content]

### POINT OF VIEW
[From Agent 5]

### EMOTIONAL REGISTER
[From Agents 1 + 5]

### RECURRING MOTIFS & KEY PHRASES
[From Agents 1 + 4]

### WHAT THEY DON'T DO (Anti-Patterns)
[From Agent 5 — critical section]

### LONG-FORM STRUCTURAL APPROACH
[From Agent 5 — how to build blog posts, articles]

### SHORT-FORM STRUCTURAL APPROACH
[From Agent 5 — how to build LinkedIn, social, quick-hit content]

### EMAIL STRUCTURAL APPROACH
[From Agent 5 — nurture sequences, resource delivery, sales]

### VOICE CALIBRATION BY FORMAT
[Synthesis — the table showing how voice shifts across formats]

### BACKGROUND THAT SHAPES THE VOICE
[Key biographical details that inform tone and credibility]
```

---

## Step 5: Test & Refine

The voice profile is a living document. It gets sharper with every round of content.

### Initial Validation
1. Write **3 test pieces** in different formats:
   - One long-form (blog post or article)
   - One short-form (LinkedIn post or social media)
   - One email (nurture, outreach, or resource delivery)
2. Have the client react: **"Does this sound like me?"**
3. Capture their feedback — especially corrections ("I'd never say it that way") and confirmations ("Yes, exactly like that")

### Ongoing Refinement
- After every round of content creation and feedback, update the profile
- Add new anti-patterns as you discover them
- Add new stories and aphorisms as the client produces new content
- Update the story bank when new content reveals new anchor stories
- Adjust format-specific guidance based on what performs well

### What to Watch For
- **Corrections** are obvious — "no, not like that" → update anti-patterns
- **Confirmations** are quieter but equally valuable — "yes, perfect" → reinforce that pattern
- **New content** from the client (new posts, new talks) → re-analyze and update the story bank, aphorism bank, and frameworks

---

## Quick Reference: The Process at a Glance

```
UPLOAD SOURCE MATERIAL (50K+ words ideal)
        ↓
SPAWN 5 PARALLEL AGENTS
  ├── Agent 1: Tone & Emotional Register
  ├── Agent 2: Sentence Structure & Linguistics
  ├── Agent 3: Story Bank Extraction
  ├── Agent 4: Frameworks, Aphorisms & Data
  └── Agent 5: Structure & Anti-Patterns
        ↓
SYNTHESIZE INTO MASTER VOICE PROFILE
        ↓
WRITE 3 TEST PIECES (blog, social, email)
        ↓
CLIENT FEEDBACK → UPDATE PROFILE
        ↓
REPEAT WITH EVERY NEW CONTENT ROUND
```

---

## Notes

- The multi-agent approach works because specialization creates depth. One generalist agent reading 200 pages will lose patterns that a focused agent catches.
- Anti-patterns are as important as patterns. What someone DOESN'T do defines their voice just as much as what they do.
- The voice profile should be stored as a memory file so it persists across conversations and is automatically loaded when creating content.
- Always check the voice profile before writing ANY content for the client. Never default to generic AI voice.

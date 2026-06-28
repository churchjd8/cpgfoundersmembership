import Anthropic from "@anthropic-ai/sdk";
import { RECAP_SYSTEM_PROMPT } from "./jeff-voice";

export type ActionItem = { owner: string; task: string; due: string };
export type Quote = { speaker: string; quote: string };
export type DiscussionTopic = { topic: string; points: string[] };

export type Recap = {
  meeting_title: string;
  subject: string;
  one_liner: string;
  tldr: string[];
  decisions: string[];
  action_items: ActionItem[];
  open_questions: string[];
  notable_quotes: Quote[];
  discussion_notes: DiscussionTopic[];
  next_steps: string;
};

// Source-agnostic meeting payload. Built from Fireflies; could be filled from
// Fathom, Otter, or anything else.
export type MeetingPayload = {
  title: string;
  url: string;
  recording_id: number | string;
  start_time: string;
  end_time: string;
  attendees: { name: string; email?: string }[];
  summary?: string;
  transcript?: string;
  action_items?: string;
};

const MODEL = "claude-sonnet-4-6";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generateRecap(meeting: MeetingPayload): Promise<Recap> {
  const attendeeList = meeting.attendees
    .map((a) => `${a.name}${a.email ? ` <${a.email}>` : ""}`)
    .join(", ");

  const d = new Date(meeting.start_time);
  const dateMdy = `${d.getMonth() + 1}/${d.getDate()}/${String(d.getFullYear()).slice(-2)}`;

  const userBlock = [
    `MEETING TITLE: ${meeting.title}`,
    `DATE_MDY: ${dateMdy}`,
    `DATE: ${meeting.start_time}`,
    `ATTENDEES: ${attendeeList}`,
    `RECORDING URL: ${meeting.url}`,
    "",
    meeting.summary ? `--- SUMMARY ---\n${meeting.summary}\n` : "",
    meeting.action_items ? `--- ACTION ITEMS (from recorder) ---\n${meeting.action_items}\n` : "",
    meeting.transcript ? `--- TRANSCRIPT ---\n${meeting.transcript}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: [
      {
        type: "text",
        text: RECAP_SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: userBlock }],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  return parseRecapJson(text);
}

function parseRecapJson(raw: string): Recap {
  const cleaned = raw
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
  const parsed = JSON.parse(cleaned);
  return {
    meeting_title: String(parsed.meeting_title ?? parsed.subject ?? ""),
    subject: String(parsed.subject ?? ""),
    one_liner: String(parsed.one_liner ?? ""),
    tldr: Array.isArray(parsed.tldr) ? parsed.tldr.map(String) : [],
    decisions: Array.isArray(parsed.decisions) ? parsed.decisions.map(String) : [],
    action_items: Array.isArray(parsed.action_items)
      ? parsed.action_items.map((a: ActionItem) => ({
          owner: String(a.owner ?? "TBD"),
          task: String(a.task ?? ""),
          due: String(a.due ?? "TBD"),
        }))
      : [],
    open_questions: Array.isArray(parsed.open_questions) ? parsed.open_questions.map(String) : [],
    notable_quotes: Array.isArray(parsed.notable_quotes)
      ? parsed.notable_quotes.map((q: Quote) => ({
          speaker: String(q.speaker ?? ""),
          quote: String(q.quote ?? ""),
        }))
      : [],
    discussion_notes: Array.isArray(parsed.discussion_notes)
      ? parsed.discussion_notes.map((t: DiscussionTopic) => ({
          topic: String(t.topic ?? ""),
          points: Array.isArray(t.points) ? t.points.map(String) : [],
        }))
      : [],
    next_steps: String(parsed.next_steps ?? ""),
  };
}

export function recapToHtml(recap: Recap, meeting: MeetingPayload): string {
  const safe = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const li = (items: string[]) => items.map((x) => `<li>${safe(x)}</li>`).join("");
  const attendeesLine = meeting.attendees.map((a) => safe(a.name)).join(", ");
  const date = new Date(meeting.start_time).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:680px;color:#1a1a1a;line-height:1.5">
  <p style="font-size:13px;color:#666;margin-bottom:4px">${safe(date)} PT &nbsp;·&nbsp; ${safe(attendeesLine)}</p>
  <h2 style="margin-top:0">${safe(recap.meeting_title)}</h2>

  <p style="font-size:17px;font-weight:600;border-left:3px solid #000;padding-left:12px;margin:18px 0">
    ${safe(recap.one_liner)}
  </p>

  <h3 style="margin-bottom:6px">TL;DR</h3>
  <ul style="margin-top:0">${li(recap.tldr)}</ul>

  ${recap.decisions.length ? `<h3 style="margin-bottom:6px">Decisions</h3><ul style="margin-top:0">${li(recap.decisions)}</ul>` : ""}

  ${
    recap.action_items.length
      ? `<h3 style="margin-bottom:6px">Action items</h3>
         <ol style="margin-top:0">${recap.action_items
           .map(
             (a) =>
               `<li><strong>${safe(a.owner)}</strong> — ${safe(a.task)} <em style="color:#666">(${safe(a.due)})</em></li>`,
           )
           .join("")}</ol>`
      : ""
  }

  ${recap.open_questions.length ? `<h3 style="margin-bottom:6px">Open questions</h3><ul style="margin-top:0">${li(recap.open_questions)}</ul>` : ""}

  ${
    recap.notable_quotes.length
      ? `<h3 style="margin-bottom:6px">Notable quotes</h3>
         ${recap.notable_quotes
           .map(
             (q) =>
               `<blockquote style="border-left:3px solid #ccc;padding-left:12px;margin:8px 0;color:#333"><em>"${safe(q.quote)}"</em><br><span style="font-size:13px;color:#666">— ${safe(q.speaker)}</span></blockquote>`,
           )
           .join("")}`
      : ""
  }

  <p style="margin-top:20px"><strong>Next steps:</strong> ${safe(recap.next_steps)}</p>

  <p style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;font-size:13px;color:#666">
    ${meeting.url ? `<a href="${safe(meeting.url)}" style="color:#0066cc">Open recording</a> &nbsp;·&nbsp;` : ""}
    Full notes attached as Word doc in Dropbox.
  </p>
</div>`.trim();
}

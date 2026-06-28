import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
} from "docx";
import type { Recap, MeetingPayload } from "./meeting-recap";

const FONT = "Calibri";

const heading = (text: string, level: (typeof HeadingLevel)[keyof typeof HeadingLevel]) =>
  new Paragraph({
    heading: level,
    children: [new TextRun({ text, bold: true, font: FONT })],
    spacing: { before: 240, after: 120 },
  });

const body = (text: string, opts: { italic?: boolean; bold?: boolean } = {}) =>
  new Paragraph({
    children: [new TextRun({ text, font: FONT, italics: opts.italic, bold: opts.bold })],
    spacing: { after: 120 },
  });

const bullet = (text: string) =>
  new Paragraph({
    children: [new TextRun({ text, font: FONT })],
    bullet: { level: 0 },
    spacing: { after: 80 },
  });

const numbered = (text: string) =>
  new Paragraph({
    children: [new TextRun({ text, font: FONT })],
    numbering: { reference: "action-items", level: 0 },
    spacing: { after: 80 },
  });

export async function buildRecapDocx(recap: Recap, meeting: MeetingPayload): Promise<Buffer> {
  const date = new Date(meeting.start_time).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "long",
    timeStyle: "short",
  });
  const attendees = meeting.attendees.map((a) => a.name).join(", ");

  const sections: Paragraph[] = [];

  // Title
  sections.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.LEFT,
      children: [new TextRun({ text: recap.meeting_title, bold: true, font: FONT, size: 36 })],
    }),
    body(`${date} PT`, { italic: true }),
    body(`Attendees: ${attendees}`, { italic: true }),
    body(`Recording: ${meeting.url}`, { italic: true }),
  );

  // One-liner
  sections.push(
    heading("Bottom line", HeadingLevel.HEADING_1),
    body(recap.one_liner, { bold: true }),
  );

  // TL;DR
  if (recap.tldr.length) {
    sections.push(heading("TL;DR", HeadingLevel.HEADING_1));
    recap.tldr.forEach((b) => sections.push(bullet(b)));
  }

  // Decisions
  if (recap.decisions.length) {
    sections.push(heading("Decisions", HeadingLevel.HEADING_1));
    recap.decisions.forEach((b) => sections.push(bullet(b)));
  }

  // Action items
  if (recap.action_items.length) {
    sections.push(heading("Action items", HeadingLevel.HEADING_1));
    recap.action_items.forEach((a) =>
      sections.push(numbered(`${a.owner} — ${a.task} (${a.due})`)),
    );
  }

  // Open questions
  if (recap.open_questions.length) {
    sections.push(heading("Open questions", HeadingLevel.HEADING_1));
    recap.open_questions.forEach((b) => sections.push(bullet(b)));
  }

  // Discussion notes
  if (recap.discussion_notes.length) {
    sections.push(heading("Discussion notes", HeadingLevel.HEADING_1));
    recap.discussion_notes.forEach((topic) => {
      sections.push(heading(topic.topic, HeadingLevel.HEADING_2));
      topic.points.forEach((p) => sections.push(bullet(p)));
    });
  }

  // Notable quotes
  if (recap.notable_quotes.length) {
    sections.push(heading("Notable quotes", HeadingLevel.HEADING_1));
    recap.notable_quotes.forEach((q) => {
      sections.push(body(`"${q.quote}"`, { italic: true }));
      sections.push(body(`— ${q.speaker}`));
    });
  }

  // Next steps
  if (recap.next_steps) {
    sections.push(heading("Next steps", HeadingLevel.HEADING_1));
    sections.push(body(recap.next_steps));
  }

  const doc = new Document({
    creator: "CPG Founders Group",
    title: recap.meeting_title,
    description: "Call recap generated from Fathom",
    numbering: {
      config: [
        {
          reference: "action-items",
          levels: [
            {
              level: 0,
              format: "decimal",
              text: "%1.",
              alignment: AlignmentType.LEFT,
            },
          ],
        },
      ],
    },
    sections: [{ children: sections }],
  });

  return Packer.toBuffer(doc) as Promise<Buffer>;
}

export function docxFilename(recap: Recap, meeting: MeetingPayload): string {
  // meeting_title already starts with M/D/YY per Jeff's preference. Replace
  // path-unsafe slashes with dashes (5/7/26 → 5-7-26) so it works as a filename.
  const title = recap.meeting_title || meeting.title || "Untitled";
  const safeTitle = title
    .replace(/\//g, "-")
    .replace(/[\\:*?"<>|]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  return `${safeTitle}.docx`;
}

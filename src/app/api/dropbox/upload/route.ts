import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { uploadDocxToDropbox } from "@/lib/dropbox";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

type UploadBody = {
  filename?: unknown;
  contentBase64?: unknown;
  destFolder?: unknown;
};

function verifyToken(header: string | null, expected: string): boolean {
  if (!header) return false;
  const prefix = "Bearer ";
  if (!header.startsWith(prefix)) return false;
  const provided = header.slice(prefix.length);
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// Reject anything that could escape the destination folder.
function safeFilename(name: string): string | null {
  if (!name || name.includes("/") || name.includes("\\") || name.includes("\0")) return null;
  if (name === "." || name === "..") return null;
  return name.trim();
}

function normalizeFolder(folder: string): string | null {
  const trimmed = folder.trim();
  if (!trimmed.startsWith("/")) return null;
  return trimmed.replace(/\/+$/, "");
}

export async function POST(request: Request) {
  const token = process.env.DROPBOX_UPLOAD_TOKEN;
  if (!token) {
    console.error("[dropbox/upload] DROPBOX_UPLOAD_TOKEN not set");
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  if (!verifyToken(request.headers.get("authorization"), token)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: UploadBody;
  try {
    body = (await request.json()) as UploadBody;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const rawFilename = typeof body.filename === "string" ? body.filename : "";
  const filename = safeFilename(rawFilename);
  if (!filename) {
    return NextResponse.json(
      { error: "filename required (no slashes or path traversal)" },
      { status: 400 },
    );
  }

  const contentBase64 = typeof body.contentBase64 === "string" ? body.contentBase64 : "";
  if (!contentBase64) {
    return NextResponse.json({ error: "contentBase64 required" }, { status: 400 });
  }

  let buffer: Buffer;
  try {
    buffer = Buffer.from(contentBase64, "base64");
    if (buffer.length === 0) throw new Error("empty");
  } catch {
    return NextResponse.json({ error: "contentBase64 not valid base64" }, { status: 400 });
  }

  const defaultFolder = process.env.DROPBOX_RECAP_FOLDER || "/";
  const destFolderRaw = typeof body.destFolder === "string" && body.destFolder.trim()
    ? body.destFolder
    : defaultFolder;
  const destFolder = normalizeFolder(destFolderRaw);
  if (!destFolder) {
    return NextResponse.json(
      { error: "destFolder must start with /" },
      { status: 400 },
    );
  }

  const destPath = `${destFolder}/${filename}`;

  try {
    const result = await uploadDocxToDropbox(buffer, destPath);
    return NextResponse.json({
      ok: true,
      path: result.path,
      size: result.size,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "upload failed";
    console.error("[dropbox/upload]", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

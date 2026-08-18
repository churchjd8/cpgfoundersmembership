// Minimal Dropbox client. Uses a long-lived refresh token to mint short-lived
// access tokens, then uploads via /2/files/upload.

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.token;
  }

  const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
  const appKey = process.env.DROPBOX_APP_KEY;
  const appSecret = process.env.DROPBOX_APP_SECRET;
  if (!refreshToken || !appKey || !appSecret) {
    throw new Error("Dropbox credentials missing (DROPBOX_REFRESH_TOKEN/APP_KEY/APP_SECRET)");
  }

  const basic = Buffer.from(`${appKey}:${appSecret}`).toString("base64");
  const res = await fetch("https://api.dropboxapi.com/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Dropbox token refresh failed (${res.status}): ${err}`);
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.token;
}

// Dropbox-API-Arg must be 7-bit ASCII. Escape any non-ASCII codepoints in the JSON.
function asciiEscape(s: string): string {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    out += code > 0x7f ? `\\u${code.toString(16).padStart(4, "0")}` : s[i];
  }
  return out;
}

export type DropboxUploadResult = { path: string; size: number };

export async function uploadDocxToDropbox(
  buffer: Buffer,
  destPath: string,
): Promise<DropboxUploadResult> {
  return uploadBufferToDropbox(buffer, destPath, "add");
}

async function uploadBufferToDropbox(
  buffer: Buffer,
  destPath: string,
  mode: "add" | "overwrite",
): Promise<DropboxUploadResult> {
  const token = await getAccessToken();

  const apiArg = JSON.stringify({
    path: destPath,
    mode,
    autorename: mode === "add",
    mute: true,
    strict_conflict: false,
  });

  const res = await fetch("https://content.dropboxapi.com/2/files/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/octet-stream",
      "Dropbox-API-Arg": asciiEscape(apiArg),
    },
    body: new Uint8Array(buffer),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Dropbox upload failed (${res.status}): ${err}`);
  }
  const data = (await res.json()) as { path_display: string; size: number };
  return { path: data.path_display, size: data.size };
}

// Returns null if the file does not exist (Dropbox returns 409 for
// path_lookup/not_found). Throws on any other error.
export async function downloadJsonFromDropbox<T>(path: string): Promise<T | null> {
  const token = await getAccessToken();
  const res = await fetch("https://content.dropboxapi.com/2/files/download", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Dropbox-API-Arg": asciiEscape(JSON.stringify({ path })),
    },
  });
  if (res.status === 409) return null;
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Dropbox download failed (${res.status}): ${err}`);
  }
  const text = await res.text();
  return JSON.parse(text) as T;
}

export async function uploadJsonToDropbox(path: string, data: unknown): Promise<void> {
  const buf = Buffer.from(JSON.stringify(data, null, 2), "utf8");
  await uploadBufferToDropbox(buf, path, "overwrite");
}

export type DropboxFolderEntry = { name: string; path_display: string };

// Lists immediate child folders of a Dropbox path. Used to seed the client
// registry from existing client subfolders. Returns [] if parent is missing.
export async function listDropboxFolders(parentPath: string): Promise<DropboxFolderEntry[]> {
  const token = await getAccessToken();
  const folders: DropboxFolderEntry[] = [];
  let cursor: string | null = null;

  do {
    const url = cursor
      ? "https://api.dropboxapi.com/2/files/list_folder/continue"
      : "https://api.dropboxapi.com/2/files/list_folder";
    const body = cursor
      ? { cursor }
      : { path: parentPath, recursive: false, include_non_downloadable_files: false };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status === 409) return [];
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Dropbox list_folder failed (${res.status}): ${err}`);
    }
    const data = (await res.json()) as {
      entries: Array<{ ".tag": string; name: string; path_display: string }>;
      cursor: string;
      has_more: boolean;
    };
    for (const entry of data.entries) {
      if (entry[".tag"] === "folder") {
        folders.push({ name: entry.name, path_display: entry.path_display });
      }
    }
    cursor = data.has_more ? data.cursor : null;
  } while (cursor);

  return folders;
}

export async function ensureDropboxFolder(path: string): Promise<void> {
  const token = await getAccessToken();
  const res = await fetch("https://api.dropboxapi.com/2/files/create_folder_v2", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path, autorename: false }),
  });
  if (res.ok) return;
  if (res.status === 409) {
    const errBody = await res.text();
    if (errBody.includes("conflict") || errBody.includes("already")) return;
    throw new Error(`Dropbox create_folder failed (${res.status}): ${errBody}`);
  }
  const err = await res.text();
  throw new Error(`Dropbox create_folder failed (${res.status}): ${err}`);
}

#!/usr/bin/env python3
"""Host a replay video on Jeff's Dropbox (Pro) and wire it into the site.

Usage (from /home/joshua/jeffchurch):
  python3 scripts/upload-replay-dropbox.py <local.mp4> <dropbox-filename.mp4> [content-file]

  - Uploads in 100 MB chunks to /2026 Dream Makers/Website Media/replays/
  - Creates (or reuses) a public shared link, converts it to a direct raw= link
  - Verifies the link serves video/mp4 with byte-range support
  - If content-file is given (default src/app/fatal-flaws-resources/content.ts),
    replaces the replay url in it, commits and pushes.

Why Dropbox: Vercel Blob on the Hobby plan gets suspended once the monthly
transfer quota is exceeded (happened 2026-09-22). Dropbox Pro links have
hundreds of GB/day of bandwidth and cost nothing extra.
"""
import os, sys, json, re, subprocess, urllib.request, urllib.parse, urllib.error

def env():
    for line in open(".env"):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k, v.strip().strip('"'))

def post(url, data=None, headers=None):
    req = urllib.request.Request(url, data=data, headers=headers or {}, method="POST")
    with urllib.request.urlopen(req, timeout=900) as r:
        return json.loads(r.read().decode() or "{}")

def main():
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    src, name = sys.argv[1], sys.argv[2]
    content_file = sys.argv[3] if len(sys.argv) > 3 else "src/app/fatal-flaws-resources/content.ts"
    env()
    tok = post("https://api.dropbox.com/oauth2/token",
        urllib.parse.urlencode({"grant_type": "refresh_token", "refresh_token": os.environ["DROPBOX_REFRESH_TOKEN"],
            "client_id": os.environ["DROPBOX_APP_KEY"], "client_secret": os.environ["DROPBOX_APP_SECRET"]}).encode(),
        {"Content-Type": "application/x-www-form-urlencoded"})["access_token"]
    H = {"Authorization": f"Bearer {tok}"}
    dest = f"/2026 Dream Makers/Website Media/replays/{name}"
    CH = 100 * 1024 * 1024
    size = os.path.getsize(src)
    print(f"uploading {size/1e6:.0f} MB -> {dest}", flush=True)
    with open(src, "rb") as f:
        chunk = f.read(CH)
        s = post("https://content.dropboxapi.com/2/files/upload_session/start", chunk,
                 {**H, "Content-Type": "application/octet-stream", "Dropbox-API-Arg": json.dumps({"close": False})})
        sid, off = s["session_id"], len(chunk)
        while off < size:
            chunk = f.read(CH)
            arg = {"cursor": {"session_id": sid, "offset": off}}
            if off + len(chunk) >= size:
                arg["commit"] = {"path": dest, "mode": "overwrite", "mute": True}
                r = post("https://content.dropboxapi.com/2/files/upload_session/finish", chunk,
                         {**H, "Content-Type": "application/octet-stream", "Dropbox-API-Arg": json.dumps(arg)})
                print("uploaded", r.get("path_display"), r.get("size"), flush=True)
            else:
                post("https://content.dropboxapi.com/2/files/upload_session/append_v2", chunk,
                     {**H, "Content-Type": "application/octet-stream", "Dropbox-API-Arg": json.dumps(arg)})
            off += len(chunk)
            print(f"  {off/1e6:.0f}/{size/1e6:.0f} MB", flush=True)
    try:
        link = post("https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
                    json.dumps({"path": dest, "settings": {"requested_visibility": "public", "audience": "public", "access": "viewer"}}).encode(),
                    {**H, "Content-Type": "application/json"})
    except urllib.error.HTTPError as e:
        body = json.loads(e.read().decode())
        link = body["error"]["shared_link_already_exists"]["metadata"]
    url = re.sub(r"[?&]dl=\d", "", link["url"])
    url += ("&" if "?" in url else "?") + "raw=1"
    print("direct url:", url)

    # verify: follow redirect, ask for a byte range
    req = urllib.request.Request(url, headers={"Range": "bytes=0-1023"})
    with urllib.request.urlopen(req, timeout=60) as r:
        print("verify:", r.status, r.headers.get("Content-Type"), r.headers.get("Accept-Ranges"), r.headers.get("Content-Range"))
        assert r.status == 206 and b"ftyp" in r.read(64), "direct link did not serve a seekable mp4"

    if content_file and os.path.exists(content_file):
        txt = open(content_file).read()
        new, n = re.subn(r'(url:\s*")[^"]+(")', lambda m: m.group(1) + url + m.group(2), txt, count=1)
        if n:
            open(content_file, "w").write(new)
            subprocess.check_call(["git", "add", content_file])
            subprocess.check_call(["git", "commit", "-m", f"Serve replay from Dropbox after Vercel Blob suspension\n\n{name}\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"])
            subprocess.check_call(["git", "push"])
            print("committed and pushed; Vercel will redeploy")
        else:
            print("no url: found in", content_file, "- paste the direct url manually")

if __name__ == "__main__":
    main()

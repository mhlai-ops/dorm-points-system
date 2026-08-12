import base64
import json
import os
import subprocess
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OWNER = "mhlai-ops"
REPO = "dorm-points-system"
ENV = {**os.environ, "GH_FORCE_TTY": "never"}


def gh_api(path: str, method: str = "GET", payload: dict | None = None) -> dict:
    args = ["gh", "api", path]
    if method != "GET":
        args += ["--method", method]
    if payload is not None:
        args += ["--input", "-"]
        result = subprocess.run(args, cwd=ROOT, input=json.dumps(payload), text=True, capture_output=True, env=ENV)
    else:
        result = subprocess.run(args, cwd=ROOT, text=True, capture_output=True, env=ENV)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())
    output = re.sub(r"\x1b\[[0-9;]*[A-Za-z]", "", result.stdout).strip()
    if not output:
        raise RuntimeError(f"GitHub API returned no JSON. stderr={result.stderr!r}")
    try:
        return json.loads(output)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"GitHub API returned non-JSON: {output!r}; stderr={result.stderr!r}") from exc


def tracked_files() -> list[tuple[str, str]]:
    result = subprocess.run(["git", "ls-files", "-s"], cwd=ROOT, text=True, capture_output=True, check=True)
    items = []
    for line in result.stdout.splitlines():
        mode, _sha, _stage, path = line.split(None, 3)
        items.append((mode, path))
    return items


def main() -> None:
    entries = []
    files = tracked_files()
    for index, (mode, relative) in enumerate(files, start=1):
        data = (ROOT / relative).read_bytes()
        blob = gh_api(f"repos/{OWNER}/{REPO}/git/blobs", "POST", {"content": base64.b64encode(data).decode("ascii"), "encoding": "base64"})
        entries.append({"path": relative, "mode": "100755" if mode == "100755" else "100644", "type": "blob", "sha": blob["sha"]})
        print(f"blob {index}/{len(files)} {relative}", flush=True)
    tree = gh_api(f"repos/{OWNER}/{REPO}/git/trees", "POST", {"tree": entries})
    commit = gh_api(f"repos/{OWNER}/{REPO}/git/commits", "POST", {"message": "chore: publish complete dorm points app", "tree": tree["sha"]})
    try:
        ref = gh_api(f"repos/{OWNER}/{REPO}/git/refs", "POST", {"ref": "refs/heads/main", "sha": commit["sha"]})
    except RuntimeError as error:
        if "Reference already exists" not in str(error):
            raise
        ref = gh_api(f"repos/{OWNER}/{REPO}/git/refs/heads/main", "PATCH", {"sha": commit["sha"], "force": True})
    print(json.dumps({"files": len(files), "tree": tree["sha"], "commit": commit["sha"], "ref": ref.get("ref", "refs/heads/main")}))


if __name__ == "__main__":
    main()

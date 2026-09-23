"""Start samples/js-api on an ephemeral port for pytest + httpx."""

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "samples" / "js-api" / "scripts" / "serve-ephemeral.mjs"


def start_api():
    proc = subprocess.Popen(
        ["node", str(SCRIPT)],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    line = proc.stdout.readline().strip()
    if not line.startswith("http://"):
        proc.kill()
        err = proc.stderr.read()
        raise RuntimeError(f"API did not print a URL: {line!r} {err}")
    return proc, line


def stop_api(proc):
    proc.terminate()
    proc.wait(timeout=5)

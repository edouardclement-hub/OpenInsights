#!/usr/bin/env bash
# Build the EPM copy deck. Creates a local Python environment on first run.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV="$HERE/.venv"

if [ ! -x "$VENV/bin/python" ]; then
  echo "First run: setting up a local Python environment..."
  python3 -m venv "$VENV"
  "$VENV/bin/pip" install --quiet --upgrade pip >/dev/null 2>&1 || true
  "$VENV/bin/pip" install --quiet -r "$HERE/requirements.txt"
fi

exec "$VENV/bin/python" "$HERE/build_deck.py" "$@"

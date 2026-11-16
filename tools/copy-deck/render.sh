#!/usr/bin/env bash
# Render the built .docx to PDF so you can eyeball the layout. Needs Google Chrome.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV="$HERE/.venv"
[ -x "$VENV/bin/python" ] || { echo "Run 'npm run copy-deck' first."; exit 1; }
exec "$VENV/bin/python" "$HERE/render_pdf.py" "$@"

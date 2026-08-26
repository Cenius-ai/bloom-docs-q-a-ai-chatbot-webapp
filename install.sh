#!/bin/sh
set -eu

cd "$(dirname "$0")"

echo "=== Bloom — Installing dependencies ==="
export NG_CLI_ANALYTICS=false
export CI=true

# node version advisory (auto-added by cenius)
if command -v node >/dev/null 2>&1; then
  _REQ_NODE="$(node -p "(require('./package.json').engines||{}).node||''" 2>/dev/null || true)"
  [ -n "$_REQ_NODE" ] && echo "-> This app requires Node $_REQ_NODE (you have $(node -v)). If install fails with EBADENGINE, upgrade Node: https://nodejs.org"
fi
npm install --no-audit --no-fund

echo ""
echo "=== Setup complete ==="
echo "Run the app with: npx ng serve --host 0.0.0.0 --port 4200 --disable-host-check"
echo "Then open http://localhost:4200 in your browser."

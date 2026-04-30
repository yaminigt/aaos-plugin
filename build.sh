#!/bin/bash
set -e

cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "Installing plugin dependencies..."
  if command -v yarn >/dev/null 2>&1; then
    yarn install --silent
  else
    npm install --silent
  fi
fi

echo "Building AAOS plugin..."
if command -v yarn >/dev/null 2>&1; then
  yarn vite build --config vite.config.js
else
  npx vite build --config vite.config.js
fi

echo ""
echo "Built plugin to $(pwd)/index.js"

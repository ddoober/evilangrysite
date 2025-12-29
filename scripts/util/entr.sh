#!/usr/bin/env bash
set -euo pipefail

while sleep 0.1; do 
  fd -H --type f . "./src/" "./static/" | entr -d uv run "./scripts/build.py" 2>/dev/null || true
  echo "restarting entr..."
done


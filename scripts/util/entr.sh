#!/usr/bin/env bash
set -euo pipefail

while sleep 0.1; do 
  fd -H --type f . "./src/" "./static/" | entr -d uv run "./scripts/build.py" || true
  echo "restarting entr..."
done


#!/usr/bin/env bash
set -euo pipefail

function check_installed {
  if ! command -v "$1" &>/dev/null; then 
    echo "$1 not found on path! is it installed?"
    exit 1
  fi
}

check_installed entr
check_installed uv
check_installed fd

mkdir -p "./dist/"
uv run -m http.server -d "./dist/" &
pid=$!

fd -H --type f . "./src/" "./static/" | entr uv run "./scripts/build.py"

kill "$pid"


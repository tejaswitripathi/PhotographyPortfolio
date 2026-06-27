#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/dist"

rm -rf "$OUT"
mkdir -p "$OUT"

rsync -a \
  --exclude ".git/" \
  --exclude ".DS_Store" \
  --exclude "dist/" \
  --exclude "assets/junk/" \
  --exclude "assets/demos/" \
  "$ROOT/" "$OUT/"

oversized="$(find "$OUT" -type f -size +25M -print)"
if [[ -n "$oversized" ]]; then
  echo "Deploy folder contains files over Cloudflare Pages' 25 MiB limit:"
  echo "$oversized"
  exit 1
fi

echo "Prepared deploy folder: $OUT"

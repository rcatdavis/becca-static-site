#!/usr/bin/env bash
#
# Publishes the prototype(s) in this repo to the internal GitHub Pages repo:
#   https://github.internal.digitalocean.com/pages/rdavis/prototypes/
#
# Run this from a machine ON the DO network / VPN (the Cursor cloud agent cannot
# reach the internal host, so it cannot run this itself).
#
# Usage:
#   ./prototypes/publish-to-internal.sh
#
set -euo pipefail

INTERNAL_REPO="https://github.internal.digitalocean.com/rdavis/prototypes.git"
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"   # the prototypes/ dir
WORK="$(mktemp -d)"
COMMIT_MSG="${1:-Add/update billing discount-clarity prototype}"

echo "==> Cloning internal repo: $INTERNAL_REPO"
git clone "$INTERNAL_REPO" "$WORK/prototypes"

echo "==> Copying prototype files in"
# Copy everything except this script and the deploy docs.
rsync -a --exclude 'publish-to-internal.sh' --exclude 'DEPLOY.md' \
  "$SRC_DIR/" "$WORK/prototypes/"

cd "$WORK/prototypes"
if git diff --quiet && git diff --cached --quiet; then
  echo "==> Nothing changed — internal repo already up to date."
  exit 0
fi

echo "==> Committing & pushing"
git add -A
git commit -m "$COMMIT_MSG"
git push origin "$(git rev-parse --abbrev-ref HEAD)"

echo "==> Done. Live shortly at:"
echo "    https://github.internal.digitalocean.com/pages/rdavis/prototypes/"
echo "    https://github.internal.digitalocean.com/pages/rdavis/prototypes/billing-discount-clarity/"
echo
echo "If Pages isn't enabled yet: repo Settings -> Pages -> Source: main / root."

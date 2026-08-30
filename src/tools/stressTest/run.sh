#!/bin/sh
# Runs a stress test against the given environment. See README.md.
set -e

if [ $# -lt 3 ] || [ $# -gt 4 ]; then
  echo 'Usage: ./src/tools/stressTest/run.sh <host> <email> <password> [test]' >&2
  echo '       test: tableData (default) or ndp' >&2
  echo 'e.g.:  ./src/tools/stressTest/run.sh http://localhost:9001 test@test.com password123 ndp' >&2
  exit 1
fi

# Paths are resolved relative to this file, so run.sh works from any directory
dir="$(dirname "$0")"
root="$dir/../../.."
test="${4:-tableData}"
bundle="$root/dist/stressTest/$test.js" # per-test file, so concurrent runs of different tests don't collide

# Bundle the test first so it is possible to do imports
mkdir -p "$root/dist/stressTest"
"$root/node_modules/.bin/rolldown" "$dir/$test/index.ts" --external k6 --external k6/http \
  --format esm --platform neutral --tsconfig "$root/tsconfig.json" --file "$bundle" >/dev/null

exec k6 run -e HOST="$1" -e STRESS_TEST_EMAIL="$2" -e STRESS_TEST_PASSWORD="$3" "$bundle"

#!/bin/sh
# Runs a stress test against the given environment. See README.md.
set -e

if [ $# -lt 3 ] || [ $# -gt 4 ]; then
  echo 'Usage: ./src/tools/stressTest/run.sh <host> <email> <password> [test]' >&2
  echo '       test: tableData (default) or ndp' >&2
  echo 'e.g.:  ./src/tools/stressTest/run.sh http://localhost:9001 test@test.com password123 ndp' >&2
  exit 1
fi

# The test script is resolved relative to this file, so run.sh works from any directory
exec k6 run -e HOST="$1" -e STRESS_TEST_EMAIL="$2" -e STRESS_TEST_PASSWORD="$3" "$(dirname "$0")/${4:-tableData}/index.ts"

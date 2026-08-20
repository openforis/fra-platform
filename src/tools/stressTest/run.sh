#!/bin/sh
# Runs the stress test against the given environment. See README.md.
set -e

if [ $# -ne 3 ]; then
  echo 'Usage: ./src/tools/stressTest/run.sh <host> <email> <password>' >&2
  echo 'e.g.:  ./src/tools/stressTest/run.sh http://localhost:9001 test@test.com password123' >&2
  exit 1
fi

# The test script is resolved relative to this file, so run.sh works from any directory
# TODO: exec k6 run -e HOST="$1" -e STRESS_TEST_EMAIL="$2" -e STRESS_TEST_PASSWORD="$3" "$(dirname "$0")/<stress test script>"

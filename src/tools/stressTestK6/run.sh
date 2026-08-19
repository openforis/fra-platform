#!/bin/sh
# Runs the stress test against the given environment. See README.md.
set -e

if [ $# -ne 3 ]; then
  echo 'Usage: ./src/tools/stressTestK6/run.sh <host> <email> <password>' >&2
  echo 'e.g.:  ./src/tools/stressTestK6/run.sh http://localhost:9001 test@test.com password123' >&2
  exit 1
fi

cd "$(dirname "$0")/../../.."

# TODO: exec k6 run -e HOST="$1" -e STRESS_TEST_EMAIL="$2" -e STRESS_TEST_PASSWORD="$3" src/tools/stressTestK6/<stress test scenario>

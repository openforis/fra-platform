#!/bin/sh
# Runs k6 with the environment from .env.$NODE_ENV_SCRIPT (empty NODE_ENV_SCRIPT targets .env).
# NODE_ENV_SCRIPT must always be passed, so every run states its target env explicitly.
# Usage:
#   NODE_ENV_SCRIPT= ./src/tools/stressTestK6/run.sh              # local (.env)
#   NODE_ENV_SCRIPT=test ./src/tools/stressTestK6/run.sh          # target the env in .env.test
#   NODE_ENV_SCRIPT=staging ./src/tools/stressTestK6/run.sh       # target the env in .env.staging
set -e

cd "$(dirname "$0")/../../.."

if [ -z "${NODE_ENV_SCRIPT+set}" ]; then
  echo 'NODE_ENV_SCRIPT must be set: NODE_ENV_SCRIPT= targets .env (local), NODE_ENV_SCRIPT=staging targets .env.staging' >&2
  exit 1
fi

envFile=".env${NODE_ENV_SCRIPT:+.$NODE_ENV_SCRIPT}"
if [ ! -f "$envFile" ]; then
  echo "env file not found: $envFile" >&2
  exit 1
fi

# Read the env file and export its vars for k6
while IFS= read -r line || [ -n "$line" ]; do
  case "$line" in
    [A-Za-z_]*=*) export "$line" ;;
  esac
done < "$envFile"

# TODO: exec k6 run src/tools/stressTestK6/<stress test scenario>

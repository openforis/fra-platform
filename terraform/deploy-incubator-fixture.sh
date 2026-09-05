#! /usr/bin/env bash
source "$(dirname "$0")/_common.sh"

# This is a "fast" script

# init schemas and import fixtures
yarn ts-node src/tools/db/initSchemas.ts
yarn ts-node src/tools/db/import.ts

source "$TERRAFORM_DIR/_finish.sh"

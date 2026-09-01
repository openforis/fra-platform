#! /usr/bin/env bash
source "$(dirname "$0")/_common.sh"

# This is a "fast" script

# init schemas, import fixtures and generate cache
yarn ts-node src/tools/db/initSchemas.ts
yarn ts-node src/tools/db/import.ts
yarn ts-node src/tools/generateCache

#! /usr/bin/env bash
source "$(dirname "$0")/_common.sh"

# This is a "fast" script

# init schemas, import fixtures, seed test admin (test@test.com / password123) and generate cache
yarn ts-node src/tools/db/initSchemas.ts
yarn ts-node src/tools/db/import.ts
yarn ts-node src/tools/generateCache

# add test user
yarn ts-node src/tools/user/createAdmin.ts

# print web url
heroku apps:info -a fra-platform-incubator -s | grep web_url | cut -d= -f2-

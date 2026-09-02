#! /usr/bin/env bash
source "$(dirname "$0")/_common.sh"

# This is a "slow" script (~9minutes from review)

# copy review db and generate cache
heroku pg:copy dev-fra-platform::DATABASE_URL DATABASE_URL -a fra-platform-incubator --confirm DATABASE --verbose
yarn ts-node src/tools/generateCache

# print web url
heroku apps:info -a fra-platform-incubator -s | grep web_url | cut -d= -f2-

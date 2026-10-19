#! /usr/bin/env bash
source "$(dirname "$0")/_common.sh"

# This is a "slow" script (~30minutes from review)

# copy review db and generate cache
heroku pg:copy dev-fra-platform::DATABASE_URL DATABASE_URL -a fra-platform-incubator --confirm DATABASE --verbose

# run migrations
yarn migration-steps:run

source "$(dirname "$0")/_finish.sh"

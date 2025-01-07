#!/bin/bash

# Source: http://blog.nonuby.com/blog/2012/07/05/copying-env-vars-from-one-heroku-app-to-another/

set -e

sourceApp="$1"
targetApp="$2"
defaultKeys=(APP_URI APP_VERSION DATABASE_URL FOO_COOKIE_SECRET NEW_RELIC_LICENSE_KEY NEW_RELIC_LOG PAPERTRAIL_API_TOKEN PG_MAX_CONNECTIONS REDISCLOUD_URL)
while read key value; do
  key=${key%%:}
  if [[ ${defaultKeys[*]} =~ $key ]];
    then
      echo "Ignoring $key=$value"
    else
      echo "Setting $key=$value"
      heroku config:set "$key=$value" --app "$targetApp"
  fi
done  < <(heroku config --app "$sourceApp" | sed -e '1d')

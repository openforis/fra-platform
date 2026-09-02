#! /usr/bin/env bash
set -e

app=dev-fra-platform

# keys we want to include when populating secrets
# omit keys like: FRA_MAIL_HOST, HEROKU_POSTGRESQL_AMBER_URL, REDISCLOUD_DATA_URL, etc
# print all keys in terminal using: heroku config -a dev-fra-platform --json | jq -r 'keys[]'
included_keys=(
  APP_VERSION
  AWS_ACCESS_KEY_ID
  AWS_REGION
  AWS_SECRET_ACCESS_KEY
  FRA_GOOGLE_API
  FRA_GOOGLE_CLIENT_ID
  FRA_GOOGLE_CLIENT_SECRET
  FRA_GOOGLE_MAPS_API_KEY
  GEE_PRIVATE_KEY
  INVITATION_EXPIRY_DAYS
  KIOSK_ACTIVITIES_SHEET_URL
  LOG_LEVEL
  NPM_CONFIG_PRODUCTION
  PG_MAX_CONNECTIONS
  S3_BUCKET_NAME
  SEPAL_PASSWORD
  SEPAL_USER
  WEB_MEMORY
)

# cd to script folder
cd "$(dirname "$0")"

# store all vars to variable
all_config=$(heroku config -a "$app" --json)

# start file writing
echo "review_env_vars = {" > secrets.auto.tfvars

for key in "${included_keys[@]}"; do
  quoted_value=$(echo "$all_config" | jq --arg k "$key" '.[$k]')

  # skip empty
  if [ "$quoted_value" = "null" ]; then
    continue
  fi

  echo "  ${key} = ${quoted_value}" >> secrets.auto.tfvars
done

echo "}" >> secrets.auto.tfvars

echo "wrote secrets.auto.tfvars"

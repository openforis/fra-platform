# source - don't execute directly!!
# shared setup for deploy-incubator-*.sh
set -e

# cd to script dir (e.g. when running from project root)
cd "$(dirname "$0")"

# deploy application
terraform apply -auto-approve

# check heroku-incubator remote exists (quiet, exact) then set if not exists
if ! git remote | grep -qx heroku-incubator; then
  heroku git:remote -a fra-platform-incubator -r heroku-incubator
fi

# push project to heroku
git push heroku-incubator HEAD:main

# set env vars
export DATABASE_URL=$(heroku config:get DATABASE_URL -a fra-platform-incubator)
export REDIS_QUEUE_URL=$(heroku config:get REDIS_QUEUE_URL -a fra-platform-incubator)
export REDIS_DATA_URL=$(heroku config:get REDIS_DATA_URL -a fra-platform-incubator)
export PGSSL=true
export REDIS_TLS_REJECT_UNAUTHORIZED=false

# return to project root
cd ..

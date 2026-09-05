# source - don't execute directly!!
# shared setup for deploy-incubator-*.sh
set -e

# persist terraform directory to variable
TERRAFORM_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$TERRAFORM_DIR"

# deploy application
terraform apply -auto-approve

# check heroku-incubator remote exists (quiet, exact) then set if not exists
if ! git remote | grep -qx heroku-incubator; then
  heroku git:remote -a fra-platform-incubator -r heroku-incubator
fi

# push project to heroku
git push heroku-incubator HEAD:main

# scale dynos to match production - see note in main.tf for more information
heroku ps:scale web=5:Standard-1X worker=1:Standard-1X -a fra-platform-incubator

# set env vars
export DATABASE_URL=$(heroku config:get DATABASE_URL -a fra-platform-incubator)
export REDIS_QUEUE_URL=$(heroku config:get REDIS_QUEUE_URL -a fra-platform-incubator)
export REDIS_DATA_URL=$(heroku config:get REDIS_DATA_URL -a fra-platform-incubator)
export PGSSL=true
export REDIS_TLS_REJECT_UNAUTHORIZED=false

# return to project root
cd ..

# FRA Platform - Heroku incubator

Disposable Heroku environment with Terraform.

## Setup

```bash
export HEROKU_API_KEY="<token>"
cp secrets.auto.tfvars.example secrets.auto.tfvars   # fill in real values
```

## Commands

```bash
terraform init                     # install providers (heroku, hashicorp etc)
terraform plan                     # preview changes
terraform apply [-auto-approve]    # create/update infra
terraform destroy [-auto-approve]  # tear everything down (delete heroku app etc)
```

## Deploy

```bash
heroku git:remote -a fra-platform-incubator -r heroku-incubator   # add remote (run once)
git push heroku-incubator HEAD:main                               # deploy current commit
git remote remove heroku-incubator                                # remove remote (optional)
```

## Manual steps (to be resolved)

Needed once after apply + deploy, not yet automated:

```bash
# --- Set the needed env vars --- #
export DATABASE_URL=$(heroku config:get DATABASE_URL -a fra-platform-incubator)
export REDIS_QUEUE_URL=$(heroku config:get REDIS_QUEUE_URL -a fra-platform-incubator)
export REDIS_DATA_URL=$(heroku config:get REDIS_DATA_URL -a fra-platform-incubator)
export PGSSL=true # This is needed locally
export REDIS_TLS_REJECT_UNAUTHORIZED=false # This is needed locally

# --- Init the server DB and Cache like we do in E2E --- #
yarn ts-node src/tools/db/initSchemas.ts
yarn ts-node src/tools/db/import.ts
yarn ts-node src/tools/generateCache/index.ts
```
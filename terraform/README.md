# FRA Platform - Heroku incubator

Disposable Heroku environment with Terraform.
## Installation

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

Other platforms and more information:  
[Terraform/Install](https://developer.hashicorp.com/terraform/install)


## Setup

```bash
export HEROKU_API_KEY="<token>"
```

### Alternative: `.netrc` instead of exporting HEROKU_API_KEY

Configure `~/.netrc` with API token

Generate one with `heroku authorizations:create --description "my description"`, then:

```
machine api.heroku.com
    login <ignored, any value works - used mainly as a note (e.g. which account token belongs to>
    password <api-token>
```



## Run

```bash
./generate-secrets.sh           # pull review env vars into secrets.auto.tfvars (run once, or to refresh)
./deploy-incubator-fixture.sh   # apply + deploy + seed with CI fixture data (fast)
./deploy-incubator-review.sh    # apply + deploy + copy real data from dev-fra-platform (slow, ~10min)
```

Both deploy scripts apply the Terraform config, deploy the current commit, and generate the Redis cache.  
`_common.sh` sets the env and is used by both scripts (not meant to be run directly.)  

### Optional step:  
Add `ToolsUtils.confirmDBVarsAndContinue` to initSchemas and/or generateCache and other scripts to make sure you run them in correct env.

## Terraform commands

```bash
terraform init                     # install providers (heroku, hashicorp etc)
terraform plan                     # preview changes
terraform apply [-auto-approve]    # create/update infra
terraform destroy [-auto-approve]  # tear everything down (delete heroku app etc)
```

## Heroku API token commands
```bash
heroku authorizations:create --description "test-token"   # generate new token
heroku authorizations                                     # list tokens
heroku authorizations:revoke <id>                         # revoke <id>
```
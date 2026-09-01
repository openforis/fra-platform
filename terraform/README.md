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
cp secrets.auto.tfvars.example secrets.auto.tfvars   # fill in real values
```

## Run

```bash
./deploy-incubator-fixture.sh   # apply + deploy + seed with CI fixture data (fast)
./deploy-incubator-review.sh    # apply + deploy + copy real data from dev-fra-platform (slow, ~10min)
```

Both scripts apply the Terraform config, deploy the current commit, and generate the Redis cache.  
`_common.sh` sets the env and is used by both scripts (not meant to be run directly.)  

### Optional step:  
Add `ToolsUtils.confirmVarsAndContinue` to generateCache and other scripts to make sure you run them in correct env.

## Terraform commands

```bash
terraform init                     # install providers (heroku, hashicorp etc)
terraform plan                     # preview changes
terraform apply [-auto-approve]    # create/update infra
terraform destroy [-auto-approve]  # tear everything down (delete heroku app etc)
```

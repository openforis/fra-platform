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

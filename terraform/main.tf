# FRA Platform - Heroku incubator environment
# Requirements:
#   export HEROKU_API_KEY="<token>"
# TODO: S3 backend

terraform {
  required_version = ">= 1.10.0"

  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 5.0"
    }
  }
}

provider "heroku" {
  customizations {
    set_addon_config_vars_in_state = false
  }
}

resource "heroku_app" "incubator" {
  name   = "fra-platform-incubator"
  region = "eu"
  stack  = "heroku-26"

  organization {
    name = "fra-platform"
  }
}

resource "heroku_addon" "postgres" {
  app_id = heroku_app.incubator.id
  plan   = "heroku-postgresql:essential-0"
}

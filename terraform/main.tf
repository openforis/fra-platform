# FRA Platform - Heroku incubator environment
# Requirements:
#   export HEROKU_API_KEY="<token>"
# TODO: S3 backend

terraform {
  required_version = ">= 1.10.0"

  required_providers {
    # Heroku provider
    heroku = {
      source  = "heroku/heroku"
      version = "~> 5.0"
    }

    # Hashicorps random provider for token
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
}

provider "heroku" {
  customizations {
    set_addon_config_vars_in_state = false
  }
}

resource "random_password" "token_secret" {
  length  = 64
  special = false
}

resource "heroku_app" "incubator" {
  name       = "fra-platform-incubator"
  region     = "eu"
  stack      = "heroku-26"
  buildpacks = ["heroku/nodejs"]

  organization {
    name = "fra-platform"
  }

  config_vars = {
    NODE_ENV                      = "production"
    WWWHISPER_DISABLE             = "true"
    REDIS_TLS_REJECT_UNAUTHORIZED = "false"
    PGSSL                         = "true"
    FRA_MAIL_ENABLED              = "false"
  }

  sensitive_config_vars = {
    TOKEN_SECRET             = random_password.token_secret.result
    FRA_GOOGLE_CLIENT_ID     = var.fra_google_client_id
    FRA_GOOGLE_CLIENT_SECRET = var.fra_google_client_secret
  }
}

resource "heroku_addon" "postgres" {
  app_id = heroku_app.incubator.id
  plan   = "heroku-postgresql:standard-0"
}

resource "heroku_addon" "redis_queue" {
  app_id = heroku_app.incubator.id
  plan   = "heroku-redis:mini"
}

resource "heroku_addon" "redis_data" {
  app_id = heroku_app.incubator.id
  plan   = "heroku-redis:premium-2"
}

resource "heroku_addon_attachment" "redis_queue" {
  app_id   = heroku_app.incubator.id
  addon_id = heroku_addon.redis_queue.id
  name     = "REDIS_QUEUE"
}

resource "heroku_addon_attachment" "redis_data" {
  app_id   = heroku_app.incubator.id
  addon_id = heroku_addon.redis_data.id
  name     = "REDIS_DATA"
}

# Formation defines how many dynos run for process
resource "heroku_formation" "web" {
  app_id   = heroku_app.incubator.id
  type     = "web"
  quantity = 5
  size     = "Standard-1X"
}

resource "heroku_formation" "worker" {
  app_id   = heroku_app.incubator.id
  type     = "worker"
  quantity = 1
  size     = "Standard-1X"
}

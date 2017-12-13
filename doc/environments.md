# FRA Platform architecture

## Development

FRA Platform uses GitLab (https://gitlab.com/) for version control (storing code) and 
 [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration). 

### GitLab project and credentials

There is a special "system" user named `fraplatform` which owns the project [fra-platform](https://gitlab.com/fraplatform/fra-platform) 
containing all the source code of the project. The password for the user can be found in the project's `#dev` 
 Slack channel as a pinned item. This system user is meant to just pass privileges to others or revoke them and not used 
 directly for development. 

### GitLab Continuous Integration

Whenever a user pushes commits to the `master` branch of the `fra-platform` project, there is a `deploy_staging` job which
always deploys a new build from `master` to the _Heroku dev environment_ (more on that later). This is configured in
the CI configuration file: `.gitlab-ci.yml` (project root directory). 

There is also a job to deploy production version called `deploy_production` which should be triggered manually via GitLab
 user interface. This job doesn't seem to quite work at the time of writing, and you should do production deploys from command line:
 
```
git checkout master
git pull
git push heroku-prod master
```

This requires that you have `heroku-prod` configured in your `.git/config`

```
[remote "heroku-prod"]
        url = https://git.heroku.com/fra-platform.git
        fetch = +refs/heads/*:refs/remotes/heroku/*
```

## Deployment environments

FRA Platform is deployed into [Heroku PaaS platform](https://www.heroku.com/). The environments
 are managed under a `Heroku Team` called [fra-platform](https://dashboard.heroku.com/teams/fra-platform/overview).

There are two deployment environments under the `fra-platform` team which are listed below.

### [Dev environment](https://dev-fra-platform.herokuapp.com)

All commits on master are automatically deployed here via GitLab CI.

Here is the git configuration (normally not needed): 
 ```
[remote "heroku-dev"]
        url = https://git.heroku.com/dev-fra-platform.git
        fetch = +refs/heads/*:refs/remotes/heroku/*
 ```

### [Production environment](https://fra-platform.herokuapp.com)

Deployed manually from command-line currently, see chapter _GitLab Continuous Integration_ above. 

## Email settings

FRA Platform requires to send emails (through [nodemailer](https://nodemailer.com)) to invite new users to access specific countries.

SendGrid has been selected as service provider for such purpose and it has been added as add-on in heroku using the Starter plan (up to 12000 emails per month / free).

It also provides an [online dashboard](https://sendgrid.com) that can be accessed using the following account settings:
```
username: app67746415@heroku.com
password: l7u9xjcd5238
```

To use SendGrid as service provider, the following env variables must be added to the hosting machine:
```
export FRA_MAIL_HOST=smtp.sendgrid.net
export FRA_MAIL_PORT=587
export FRA_MAIL_SECURE=false
export FRA_MAIL_USER=apikey
export FRA_MAIL_PASSWORD=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
```

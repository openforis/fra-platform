# FRA Platform

## Prerequisites

First, [install Yarn](https://yarnpkg.com/en/docs/install) (modern npm replacement).

Then, install [NodeJs](https://nodejs.org/en/download/) (currently the LTS version we are using is 20.11.1).

## The .env file

The .env file is needed for development and locally running the stack.

It must be added to the root directory of the project and match the [.env.template](./.env.template)


## Building web application

To build it once:

```yarn run build```

To constantly build it when something changes, run:

```yarn watch```

## Running the server

```yarn start```

## Running a local production environment

Runs the production build on several local web instances behind nginx, like staging runs several
dynos behind Heroku's router. Install nginx and the Heroku CLI first:

```bash
brew install nginx
brew install heroku/brew/heroku
```

Then:

```bash
yarn run:heroku:local
```

This builds the app, starts nginx (`yarn nginx:start`) and then the web instances
(`yarn run:heroku:start`). The app is served at http://localhost:9000.

Ctrl-C stops the web instances but nginx keeps running: stop it with `yarn nginx:stop`, or leave it
running and restart only the instances with `yarn run:heroku:start` (starting nginx twice fails with
"address already in use").

The instance ports (9001, 9002, ...) follow `PORT` in the .env file, and
`nginx.conf` routes to 4 instances: to run more, change `web=4` in the `run:heroku:start` script,
add the ports to `nginx.conf`, and keep instances x `PG_MAX_CONNECTIONS` (20 by default) under
postgres `max_connections` (100 by default).

## * Backend Storage Setup

## Postgres

Create a new Postgres local instance via Docker. Run the command:

```shell
sudo docker run -d --name fra-db -p 5442:5432 -e POSTGRES_DB=frap-dev -e POSTGRES_PASSWORD=frap -e POSTGRES_USER=frap postgres:15.4
```

Otherwise, check `.env` configurations for setting it up manually (note that the server port is not default!)

## Redis

Install 2 instances of redis 6.2.6 (one for queues and one for data)

```shell
sudo docker run --name fra-queue-redis -p 6379:6379 -d redis:6.2.6
```
```shell
sudo docker run --name fra-data-redis -p 6389:6379 -d redis:6.2.6
```

## Database Migrations

Migrations are run automatically on startup of the server.

### Adding a database migration

When you need e.g. a new table to the database (say "kuikka"), create a migration
template with:

```shell
yarn migration-step:create kuikka
```

Now you'll see new sql files in `src/tools/migrations/steps/steps/`.

You should edit the `<timestamp-kuikka-up.ts` to contain your `create table` -statement.
Make sure migrations can be ran twice without side effects.

### Update database e2e test fixtures

```shell
ts-node src/tools/db/export.ts
```

```shell
(cd src/tools/db && tar -czf fixtures.tar.gz fixtures && gpg --batch --yes --passphrase "$BACKUP_PASSPHRASE" --symmetric --cipher-algo AES256 -o fixtures.tar.gz.gpg fixtures.tar.gz && rm fixtures.tar.gz)
```


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
yarn migration-public:create kuikka
```

Now you'll see new sql files in `src/tools/migrations/public/steps/`.

You should edit the `<timestamp-kuikka-up.ts` to contain your `create table` -statement.
Make sure migrations can be ran twice without side effects.

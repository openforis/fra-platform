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

## Database

### Create your own local database

If you have a Docker server configured locally, just run this command:

```shell
sudo docker run -d --name fra-db -p 5442:5432 -e POSTGRES_DB=frap-dev -e POSTGRES_PASSWORD=frap -e POSTGRES_USER=frap postgres:15.4
```

Otherwise, check `.env` configurations for setting it up manually (note that the server port is not default!)

### Migrations

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

## Redis

Install 2 instances of redis 6.2.6 (one for queues and one for data)

```shell
sudo docker run --name fra-queue-redis -p 6379:6379 -d redis:6.2.6
```
```shell
sudo docker run --name fra-data-redis -p 6389:6379 -d redis:6.2.6
```

## Design decisions

* all numeric values for areas are stored in hectares, and converted for UI for user unnits
* Data points are stored in precision of year

## Icons

Download the desktop app  at https://nucleoapp.com

### Add icon to set

* Select the icon you like
* Add to Project
* Select `FRA Platform`

### Export icon set

* Go to Projects > FRA Platform
* Select all
* Export
    * Settings: SVG, SVG <symbols>
    * https://files.slack.com/files-tmb/T4FG1BM7G-F6Q547Y3G-a26d73a50d/artboard_480.png
* Download & unzip
* Move `icons.svg`, `demo.svg` to `/img`
* Run `update-icons.sh`

## Using the traditional table framework

FRA Platform contains a simple framework for creating tables with
fixed amount of rows and columns. These tables can store and retrieve
their own data so it reduces the need to custom-code the logic for
these simple cases. [The user guide is here](doc/traditional-table-guide.md).


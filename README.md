# FRA Platform

## Prerequisites

First, [install Yarn](https://yarnpkg.com/en/docs/install) (modern npm
replacement).

Then, install [NodeJs](https://nodejs.org/en/download/) (currently the
LTS version we are using is 6.x).

## Building web application

To build it once:

```yarn run build```

To constantly build it when something changes, run:

```yarn watch```

## Running the server

```node server/server.js```

## Adding a database migration

When you need e.g. a new table to the database (say "kuikka"), create a migration
template with:

```yarn run create-migration kuikka```

Now you'll see new sql files in `db/migration/migrations/sql/<timestamp>-kuikka-<up/down>.sql`

You should edit the `<timestamp-kuikka-up.sql` to contain your `create table` -statement. Maybe also
add the corresponding `drop table` to `<timestamp>-kuikka-down.sql` if we ever want to run migrations downwards.



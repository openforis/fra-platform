#!/bin/bash

if [ -z "$1" ]
  then
    echo "Give the name of the migration as parameter"
    exit 2
fi

. .env
db-migrate --config src/server/db/migration/database.json --migrations-dir src/server/db/migration/migrations create $1 --sql-file

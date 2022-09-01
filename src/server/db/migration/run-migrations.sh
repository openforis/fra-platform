#!/bin/bash
db-migrate --config src/server/db/migration/database.json --migrations-dir src/server/db/migration/migrations up

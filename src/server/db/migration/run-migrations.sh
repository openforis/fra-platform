#!/bin/bash
db-migrate --config server/db/migration/database.json --migrations-dir server/db/migration/migrations up

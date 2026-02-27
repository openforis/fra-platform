#! /bin/bash
set -eo pipefail

# project root
cd "$(git rev-parse --show-toplevel)"

CONTAINER_NAME="fra-db"
DB_USER="frap"
TEST_DB_NAME="frap-dev-test"

# flush redis
docker exec fra-queue-redis redis-cli flushall
docker exec fra-data-redis redis-cli flushall

docker exec "$CONTAINER_NAME" psql -U "$DB_USER" -d postgres -c "drop database if exists \"$TEST_DB_NAME\";"
docker exec "$CONTAINER_NAME" psql -U "$DB_USER" -d postgres -c "create database \"$TEST_DB_NAME\" owner $DB_USER;"
PGDATABASE="$TEST_DB_NAME" yarn ts-node src/tools/db/initSchemas.ts
PGDATABASE="$TEST_DB_NAME" yarn ts-node src/tools/db/import.ts
PGDATABASE="$TEST_DB_NAME" yarn ts-node src/tools/generateCache/index.ts

#!/bin/bash

set -eu

BACKUP_DIR=${BACKUP_DIR:-"./backups"}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

if [ -z "${BACKUP_NAME:-}" ]; then
    BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.sql"
else
    BACKUP_FILE="${BACKUP_DIR}/${BACKUP_NAME}"
fi

# Default excluded tables and schemas
DEFAULT_EXCLUDE_SCHEMAS="_legacy _legacy_assessment_fra_2020 _legacy_assessment_fra_2025 _legacy_pan_european"
DEFAULT_EXCLUDE_TABLES="public.activity_log assessment_fra.file assessment_paneuropean.file"

EXCLUDE_SCHEMAS="$DEFAULT_EXCLUDE_SCHEMAS ${EXCLUDE_SCHEMAS:-}"
EXCLUDE_TABLES="$DEFAULT_EXCLUDE_TABLES ${EXCLUDE_TABLES:-}"

mkdir -p "$BACKUP_DIR"

# Check env vars
if [ -z "${HEROKU_APP:-}" ]; then
    echo "Error: HEROKU_APP environment variable is not set"
    echo "Usage: HEROKU_APP=your-app-name ./partial-backup.sh"
    exit 1
fi

echo "Starting backup of $HEROKU_APP..."
echo "Backup will be stored in: $BACKUP_FILE"

# Check heroku CLI
if ! heroku apps:info --app "$HEROKU_APP" &>/dev/null; then
    echo "Error: Cannot connect to Heroku app $HEROKU_APP"
    exit 1
fi

# Get db URL
DATABASE_URL=$(heroku config:get DATABASE_URL --app "$HEROKU_APP")
if [ -z "$DATABASE_URL" ]; then
    echo "Error: Could not get DATABASE_URL from Heroku"
    exit 1
fi

SCHEMA_ARGS=""
for schema in $EXCLUDE_SCHEMAS; do
    SCHEMA_ARGS="$SCHEMA_ARGS --exclude-schema=$schema"
done

TABLE_ARGS=""
for table in $EXCLUDE_TABLES; do
    TABLE_ARGS="$TABLE_ARGS --exclude-table-data=$table"
done

# Backup
if pg_dump "$DATABASE_URL" \
  $SCHEMA_ARGS \
  --no-owner \
  --no-acl \
  --format=custom \
  $TABLE_ARGS \
  --file="$BACKUP_FILE"; then
    
    echo "Backup completed successfully: $BACKUP_FILE"
    echo "Backup size: $(du -h "$BACKUP_FILE" | cut -f1)"
else
    echo "Error: Backup failed"
    exit 1
fi

#!/bin/bash

set -eu

BACKUP_DIR=${BACKUP_DIR:-"./backups"}

# Check env vars
if [ -z "${HEROKU_APP:-}" ]; then
    echo "Error: HEROKU_APP environment variable is not set"
    echo "Usage: HEROKU_APP=your-app-name ./partial-backup.sh"
    exit 1
fi

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.sql"

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

# Backup
if pg_dump "$DATABASE_URL" \
  --exclude-schema="_legacy" \
  --exclude-schema="_legacy_assessment_fra_2020" \
  --exclude-schema="_legacy_assessment_fra_2025" \
  --exclude-schema="_legacy_pan_european" \
  --no-owner \
  --no-acl \
  --format=custom \
  --exclude-table-data="public.activity_log" \
  --exclude-table-data="public.file" \
  --exclude-table-data="assessment_fra.file" \
  --exclude-table-data="assessment_paneuropean.file" \
  --file="$BACKUP_FILE"; then
    
    echo "Backup completed successfully: $BACKUP_FILE"
    echo "Backup size: $(du -h "$BACKUP_FILE" | cut -f1)"
else
    echo "Error: Backup failed"
    exit 1
fi

#!/bin/bash

set -eu

# Check env vars
if [ -z "${BACKUP_DIR:-}" ]; then
    echo "Error: BACKUP_DIR environment variable is not set"
    exit 1
fi

if [ -z "${BACKUP_PASSPHRASE:-}" ]; then
    echo "Error: BACKUP_PASSPHRASE environment variable is not set"
    exit 1
fi

BACKUP_FILE="$BACKUP_DIR/backup_*.sql"

echo "Encrypting backup file..."

# Encrypt with AES256
gpg --symmetric \
    --cipher-algo AES256 \
    --batch \
    --passphrase "${BACKUP_PASSPHRASE}" \
    --output "${BACKUP_FILE}.gpg" \
    "${BACKUP_FILE}"

# cleanup
shred -u "${BACKUP_FILE}"

# verify
if gpg --list-packets "${BACKUP_FILE}.gpg" &>/dev/null; then
    echo "Backup encrypted successfully: ${BACKUP_FILE}.gpg"
else
    echo "Encryption failed"
    exit 1
fi

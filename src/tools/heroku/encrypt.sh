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

BACKUP_FILE=$(ls -t "${BACKUP_DIR}"/*.sql | head -n1)

if [ ! -f "${BACKUP_FILE}" ]; then
    echo "Error: No .sql backup file found in ${BACKUP_DIR}"
    exit 1
fi

echo "Found backup file: ${BACKUP_FILE}"
echo "Encrypting backup file..."

# Encrypt with AES256
echo "$BACKUP_PASSPHRASE" | gpg \
    --no-tty \
    --batch \
    --yes \
    --quiet \
    --passphrase-fd 0 \
    --symmetric \
    --cipher-algo AES256 \
    --output "${BACKUP_FILE}.gpg" \
    "${BACKUP_FILE}"

if [ -s "${BACKUP_FILE}.gpg" ]; then
    echo "Backup encrypted successfully: ${BACKUP_FILE}.gpg"
    shred -u "${BACKUP_FILE}"
else
    echo "Encryption failed"
    exit 1
fi

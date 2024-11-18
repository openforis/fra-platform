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

if [ -z "${ENCRYPTED_FILE:-}" ]; then
    echo "Error: ENCRYPTED_FILE environment variable is not set"
    echo "Usage: ENCRYPTED_FILE=backup_file.sql.gpg ./decrypt.sh"
    exit 1
fi

DECRYPTED_FILE="${ENCRYPTED_FILE%.gpg}"

echo "Decrypting backup file..."

# Decrypt file
gpg --decrypt \
    --batch \
    --passphrase "${BACKUP_PASSPHRASE}" \
    --output "${DECRYPTED_FILE}" \
    "${ENCRYPTED_FILE}"

if [ -f "${DECRYPTED_FILE}" ]; then
    echo "Backup decrypted successfully: ${DECRYPTED_FILE}"
else
    echo "Decryption failed"
    exit 1
fi 
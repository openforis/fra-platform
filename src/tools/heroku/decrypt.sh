#!/bin/bash

set -eu

# Check vars
if [ -z "${BACKUP_PASSPHRASE:-}" ]; then
    echo "Error: BACKUP_PASSPHRASE environment variable is not set"
    exit 1
fi

if [ $# -eq 0 ]; then
    echo "Error: No encrypted file specified"
    echo "Usage: $0 path/to/encrypted/file.gpg"
    exit 1
fi

ENCRYPTED_FILE="$1"
if [ ! -f "${ENCRYPTED_FILE}" ]; then
    echo "Error: File not found: ${ENCRYPTED_FILE}"
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

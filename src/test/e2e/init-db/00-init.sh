#! /bin/bash

pg_restore --no-owner --clean --if-exists -U fra -d fra /docker-entrypoint-initdb.d/backup

exit 0

#!/bin/bash

dropdb -f frap-dev --user frap
createdb --owner=frap --username=frap frap-dev
pg_restore --no-owner --clean --if-exists --verbose -U frap -d frap-dev /backup

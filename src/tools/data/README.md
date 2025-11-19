Data import / export tool
-----------------------------

### Usage
#### Export:

- `ts-node src/tools/data/export.ts`
  - This creates a folder with data in: `src/tools/data/fixtures`
- Compress and encrypt:
  - `cd src/tools/data && tar -czf fixtures.tar.gz fixtures && gpg --batch --yes --passphrase "$BACKUP_PASSPHRASE" --symmetric --cipher-algo AES256 -o fixtures.tar.gz.gpg fixtures.tar.gz && rm fixtures.tar.gz`

Relevant file: `src/server/service/databaseService/EXPORT_TABLES.ts`

#### Extract fixtures (for CI/E2E):
- Decrypt and extract fixtures:
  - `echo "$BACKUP_PASSPHRASE" | gpg --batch --passphrase-fd 0 -d src/tools/data/fixtures.tar.gz.gpg | tar -xz -C src/tools/data`

#### Import:
- To import generated data to an empty db, e.g.: `frap-dev-test`
- drop existing db: 
  - `docker exec fra-db dropdb -U frap -f frap-dev-test `
- create new db
  - `docker exec fra-db createdb -U frap frap-dev-test` 
- run migrations initialise db schema
  - `PGDATABASE=frap-dev-test yarn migration-public:run`
- import data from `src/tools/data/fixtures`
  - `PGDATABASE=frap-dev-test yarn ts-node src/tools/data/import.ts`

Or with one-liner:  
- ```
  docker exec fra-db dropdb -U frap -f frap-dev-test && docker exec fra-db createdb -U frap frap-dev-test && PGDATABASE=frap-dev-test yarn migration-public:run && PGDATABASE=frap-dev-test yarn ts-node src/tools/data/import.ts
  ```
  

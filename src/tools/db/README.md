Database import / export tool
-----------------------------

### Usage
#### Export:

- `ts-node src/tools/db/export.ts`
  - Creates a folder with data in: `src/tools/db/fixtures`
  - Copies static fixtures from `src/tools/db/staticFixtures/` into fixtures directory
- Compress and encrypt:
  - `cd src/tools/db && tar -czf fixtures.tar.gz fixtures && gpg --batch --yes --passphrase "$BACKUP_PASSPHRASE" --symmetric --cipher-algo AES256 -o fixtures.tar.gz.gpg fixtures.tar.gz && rm fixtures.tar.gz`

Relevant files:
- `src/tools/db/config/EXPORT_TABLES.ts` - Table configuration
- `src/tools/db/staticFixtures/` - Static test user fixtures
- `src/tools/db/service/` - Database service operations (exportTables, importTables, initSchemas)
- `src/tools/db/io/` - File I/O operations

#### Extract fixtures (for CI/E2E):
- Decrypt and extract fixtures:
  - `echo "$BACKUP_PASSPHRASE" | gpg --batch --passphrase-fd 0 -d src/tools/db/fixtures.tar.gz.gpg | tar -xz -C src/tools/db`

#### Import:
- To import generated data to an empty db, e.g.: `frap-dev-test`
- drop existing db:
  - `docker exec fra-db dropdb -U frap -f frap-dev-test`
- create new db
  - `docker exec fra-db createdb -U frap frap-dev-test`
- initialize db schema
  - `PGDATABASE=frap-dev-test yarn ts-node src/tools/db/initSchemas.ts`
- import data from `src/tools/db/fixtures`
  - `PGDATABASE=frap-dev-test yarn ts-node src/tools/db/import.ts`

Or with one-liner:
- ```
  docker exec fra-db dropdb -U frap -f frap-dev-test && docker exec fra-db createdb -U frap frap-dev-test && PGDATABASE=frap-dev-test yarn ts-node src/tools/db/initSchemas.ts && PGDATABASE=frap-dev-test yarn ts-node src/tools/db/import.ts
  ```
  

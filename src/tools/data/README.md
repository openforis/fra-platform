Data import / export tool
-----------------------------

### Usage
#### Export:

- `ts-node src/tools/data/export.ts`
  - This creates a folder with data in: `src/tools/data/fixtures`

Relevant file: `src/server/service/databaseService/EXPORT_TABLES.ts`

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
  

import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs'
import * as path from 'path'

import { DB } from 'server/db'
import { Logger } from 'server/utils/logger'

const client = DB
let migrationSteps: Array<string>
let previousMigrations: Array<string> = []
const executedMigrations: Array<string> = []

// TODO: Move to migration step / schema initialisation
const tableDDL = `
    create table if not exists public.migrations (
      id integer not null default nextval('public.migrations_id_seq'::regclass),
      name character varying(255) primary key not null,
      run_on timestamp without time zone not null default now()
    );
`

const init = async () => {
  await client.query(tableDDL)
  previousMigrations = await client.map('select * from migrations', [], (row) => row.name)
  migrationSteps = fs
    .readdirSync(path.join(__dirname, `steps`))
    .filter((file) => file !== 'template.ts' && file.endsWith('.ts') && !previousMigrations.includes(file))
}

const close = async () => {
  // Note: Omitted REDIS related code. Add them here if needed.
  await DB.$pool.end()
}

const exec = async () => {
  await init()

  await client.tx(async (t) => {
    // eslint-disable-next-line no-restricted-syntax
    for await (const file of migrationSteps) {
      try {
        Logger.info(`Running migration ${file}`)
        // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
        await require(`./steps/${file}`).default(t)
        executedMigrations.push(file)
      } catch (e) {
        Logger.error(e)
      }
    }
  })
  if (!process.argv.includes('--watch')) {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of executedMigrations) {
      // eslint-disable-next-line no-await-in-loop
      await client.query('insert into migrations (name) values ($1)', [file])
    }
  }

  await close()
}

Logger.info('Migrations starting')
exec().then(() => {
  Logger.info('Migrations executed')
})

import 'tsconfig-paths/register'
import 'dotenv/config'

import { VisitCycleLinksQueueFactory } from 'server/controller/cycleData/links/visitCycleLinks/queueFactory'
import { WorkerFactory as VisitLinksWorkerFactory } from 'server/controller/cycleData/links/visitCycleLinks/workerFactory'
import { UpdateDependenciesQueueFactory } from 'server/controller/cycleData/updateDependencies/queueFactory'
import { WorkerFactory } from 'server/controller/cycleData/updateDependencies/workerFactory'
import { DB } from 'server/db'
import { RedisData } from 'server/repository/redis/redisData'
import { Logger } from 'server/utils/logger'

import { getMigrationFiles } from './utils'

const client = DB
let migrationSteps: Array<string>
let previousMigrations: Array<string> = []
const executedMigrations: Array<string> = []

const tableDDL = `
    create schema if not exists migrations;

    do $$ 
    begin
      if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'migration_steps') then
        alter table public.migration_steps rename to steps;
        alter table public.steps set schema migrations;
      else
        create table if not exists migrations.steps (
          id serial primary key,
          name character varying(255) unique not null,
          run_on timestamp without time zone not null default now()
        );
      end if;
    end $$;
`

const init = async () => {
  await client.query(tableDDL)
  previousMigrations = await client.map('select * from migrations.steps', [], (row) => row.name)
  migrationSteps = getMigrationFiles(true).filter((file) => !previousMigrations.includes(file))
}

const close = async () => {
  // quick and dirty workaround to close redis connection after running integration tests
  // TODO: find a better strategy to handle Redis connections
  UpdateDependenciesQueueFactory.connection.quit()
  WorkerFactory.connection.quit()
  VisitCycleLinksQueueFactory.connection.quit()
  VisitLinksWorkerFactory.connection.quit()
  await DB.$pool.end()
  RedisData.getInstance().quit()
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
      await client.query('insert into migrations.steps (name) values ($1)', [file])
    }
  }

  await close()
}

Logger.info('Migrations starting')
exec().then(() => {
  Logger.info('Migrations executed')
})

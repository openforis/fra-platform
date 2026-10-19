import '../../scriptInit'

import { Promises } from 'utils/promises'

import { RedisData } from 'server/cache/repository/redisData'
import { UpdateDependenciesQueueFactory } from 'server/controller/cycleData/tableData/updateDependencies/queueFactory'
import { WorkerFactory } from 'server/controller/cycleData/tableData/updateDependencies/workerFactory'
import { DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'
import { VisitCycleLinksQueueFactory } from 'server/worker/tasks/verifyLinks/visitCycleLinks/queueFactory'
import { WorkerFactory as VisitLinksWorkerFactory } from 'server/worker/tasks/verifyLinks/visitCycleLinks/workerFactory'

import { getMigrationFiles } from './utils'

const client = DB

const tableDDL = `
    create schema if not exists migrations;

    do $$ 
    begin
      create table if not exists migrations.steps (
        id serial primary key,
        name character varying(255) unique not null,
        run_on timestamp without time zone not null default now()
      );
    end $$;
`

const _writeStep = async (fileName: string): Promise<void> => {
  const isWatch = process.argv.includes('--watch')
  const isReset = fileName.endsWith('-step-reset.ts')

  const shouldWrite = !isWatch && !isReset

  if (shouldWrite) await client.query('insert into migrations.steps (name) values ($1)', [fileName])
}

const init = async (): Promise<Array<string>> => {
  await client.query(tableDDL)
  const previousMigrations = await client.map<string>('select * from migrations.steps', [], (row) => row.name)
  return getMigrationFiles(true).filter((file) => !previousMigrations.includes(file))
}

const close = async (): Promise<void> => {
  // quick and dirty workaround to close redis connection after running integration tests
  // TODO: find a better strategy to handle Redis connections
  await Promise.all([
    UpdateDependenciesQueueFactory.connection.quit(),
    WorkerFactory.connection.quit(),
    VisitCycleLinksQueueFactory.connection.quit(),
    VisitLinksWorkerFactory.connection.quit(),
    DB.$pool.end(),
    RedisData.getInstance().quit(),
  ])
}

const exec = async (): Promise<Array<string>> => {
  const migrationSteps = await init()
  const executedSteps: Array<string> = []

  await Promises.each(migrationSteps, async (file) => {
    try {
      Logger.info(`Running migration ${file}`)
      // eslint-disable-next-line @typescript-eslint/no-require-imports,global-require,import/no-dynamic-require
      await require(`./steps/${file}`).default(client)
      await _writeStep(file)
      Logger.info(`Migration step completed: ${file}`)

      executedSteps.push(file)
    } catch (e) {
      Logger.error('Error caught in migration step:', e)
      throw e
    }
  })

  await close()
  return executedSteps
}

Logger.info('Migrations starting')
exec()
  .then((executedSteps) => {
    Logger.info('Migrations executed:')
    Logger.info(`\n${executedSteps.join('\n')}`)
    process.exit(0)
  })
  .catch(async (err) => {
    Logger.error('Migration process failed:', err)
    await close()
    process.exit(1)
  })

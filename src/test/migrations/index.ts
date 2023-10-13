import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs'
import * as path from 'path'

import { UpdateDependenciesQueueFactory } from 'server/controller/cycleData/updateDependencies/queueFactory'
import { WorkerFactory } from 'server/controller/cycleData/updateDependencies/workerFactory'
import { DB } from 'server/db'
import { RedisData } from 'server/repository/redis/redisData'
import { Logger } from 'server/utils/logger'

const client = DB
let migrationSteps: Array<string>
let previousMigrations: Array<string> = []
const executedMigrations: Array<string> = []

const init = async () => {
  previousMigrations = await client.map('select * from migration_steps', [], (row) => row.name)
  migrationSteps = fs
    .readdirSync(path.join(__dirname, `steps`))
    .filter((file) => file !== 'template.ts' && file.endsWith('.ts') && !previousMigrations.includes(file))
}

const close = async () => {
  // quick and dirty workaround to close redis connection after running integration tests
  // TODO: find a better strategy to handle Redis connections
  UpdateDependenciesQueueFactory.connection.quit()
  WorkerFactory.connection.quit()
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
      await client.query('insert into migration_steps (name) values ($1)', [file])
    }
  }

  await close()
}

Logger.info('Migrations starting')
exec().then(() => {
  Logger.info('Migrations executed')
})

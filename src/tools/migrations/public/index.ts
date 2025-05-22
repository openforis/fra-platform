import '../../scriptInit'

import * as fs from 'node:fs'
import * as path from 'node:path'
import { MigrationUtils } from 'tools/migrations/common/utils'
import { Promises } from 'utils/promises'

import { DB } from 'server/db'
import { Logger } from 'server/utils/logger'

const tableName = 'public'
const client = DB
let migrationSteps: Array<string>
let previousMigrations: Array<string> = []
const executedMigrations: Array<string> = []

const init = async () => {
  await MigrationUtils.createTable(tableName, client)
  previousMigrations = await MigrationUtils.getPreviousMigrations(tableName, client)
  migrationSteps = fs
    .readdirSync(path.join(__dirname, `steps`))
    .filter((file) => file !== 'template.ts' && file.endsWith('.ts') && !previousMigrations.includes(file))
    .sort((a, b) => a.localeCompare(b))
}

const exec = async () => {
  await init()

  await Promises.each(migrationSteps, async (file) => {
    try {
      Logger.info(`Running migration ${file}`)
      // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
      await require(`./steps/${file}`).default()
      executedMigrations.push(file)
    } catch (e) {
      Logger.error(e)
    }
  })

  if (!process.argv.includes('--watch')) {
    await Promises.each(executedMigrations, async (file) => {
      await client.query('insert into migrations.public (name) values ($1)', [file])
    })
  }

  await MigrationUtils.close(true)
}

Logger.info('Migrations starting')
exec()
  .then(() => {
    Logger.info('Migrations executed')
  })
  .catch(async (err) => {
    Logger.error('Migration process failed:', err)
    await MigrationUtils.close(true)
    process.exit(1)
  })

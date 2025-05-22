import '../../scriptInit'

import { MigrationUtils } from 'tools/migrations/common/utils'
import { getMigrationFiles } from 'tools/migrations/steps/utils'
import { Promises } from 'utils/promises'

import { DB } from 'server/db'
import { Logger } from 'server/utils/logger'

const tableName = 'steps'

const client = DB
let migrationSteps: Array<string>
let previousMigrations: Array<string> = []
const executedMigrations: Array<string> = []

const _writeStep = async (fileName: string) => {
  executedMigrations.push(fileName)

  const isWatch = process.argv.includes('--watch')
  const isReset = fileName.endsWith('-step-reset.ts')

  const shouldWrite = !isWatch && !isReset

  if (shouldWrite) await client.query('insert into migrations.steps (name) values ($1)', [fileName])
}

const init = async () => {
  await MigrationUtils.createTable(tableName, client)
  previousMigrations = await MigrationUtils.getPreviousMigrations(tableName, client)
  migrationSteps = getMigrationFiles(true).filter((file) => !previousMigrations.includes(file))
}

const exec = async () => {
  await init()
  await Promises.each(migrationSteps, async (file) => {
    await client.tx(async (t) => {
      try {
        Logger.info(`Running migration ${file}`)
        // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
        await require(`./steps/${file}`).default(t)
        Logger.info(`Migration step completed: ${file}`)
        await _writeStep(file)
      } catch (e) {
        Logger.error('Error caught in migration step:', e)
        throw e
      }
    })
  })
  await MigrationUtils.close(true)
}

Logger.info('Migrations starting')
exec()
  .then(() => {
    Logger.info('Migrations executed:')
    Logger.info(`\n${executedMigrations.join('\n')}`)
  })
  .catch(async (err) => {
    Logger.error('Migration process failed:', err)
    await MigrationUtils.close(true)
    process.exit(1)
  })

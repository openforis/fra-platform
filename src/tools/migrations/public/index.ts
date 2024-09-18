import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs'
import * as path from 'path'
import { tableMigrationsPublicDDL } from 'tools/migrations/public/tableMigrationsPublicDDL'
import { Promises } from 'utils/promises'

import { DB } from 'server/db'
import { Logger } from 'server/utils/logger'

const client = DB
let migrationSteps: Array<string>
let previousMigrations: Array<string> = []
const executedMigrations: Array<string> = []

const init = async () => {
  await client.query(tableMigrationsPublicDDL)
  previousMigrations = await client.map('select * from migrations.public', [], (row) => row.name)
  migrationSteps = fs
    .readdirSync(path.join(__dirname, `steps`))
    .filter((file) => file !== 'template.ts' && file.endsWith('.ts') && !previousMigrations.includes(file))
    .sort((a, b) => a.localeCompare(b))
}

const close = async () => {
  // Note: Omitted REDIS related code. Add them here if needed.
  await DB.$pool.end()
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

  await close()
}

Logger.info('Migrations starting')
exec().then(() => {
  Logger.info('Migrations executed')
})

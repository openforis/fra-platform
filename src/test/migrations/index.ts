import * as fs from 'fs'
import * as path from 'path'

import { DB } from '@server/db'
import { Logger } from '@server/utils/logger'

const client = DB
let migrations: Array<string>
let ranMigrations: Array<string> = []

beforeAll(async () => {
  ranMigrations = await client.map('select * from migration_steps', [], (row) => row.name)
  migrations = fs
    .readdirSync(path.join(__dirname, `steps`))
    .filter((file) => file !== 'template.ts' && file.endsWith('.ts'))
})

afterAll(async () => {
  await DB.$pool.end()
})

describe(`Migrations:`, () => {
  test(`steps`, async () => {
    await Promise.all(
      migrations
        .filter((migration: string) => !ranMigrations.includes(migration))
        .sort()
        .map(async (file: string) => {
          Logger.log('Running migration', file)
          // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
          return require(`./steps/${file}`).default(client)
        })
    )
  })

  test('insert ran migrations to db', async () => {
    await Promise.all(
      migrations.map(async (file: string) => {
        if (!ranMigrations.includes(file)) {
          await client.query('insert into migration_steps (name) values ($1)', [file])
        }
      })
    )
  })
})

import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

import { DB } from 'server/db'
import { Logger } from 'server/utils/logger'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const _confirmReset = (): Promise<boolean> => {
  return new Promise((resolve) => {
    rl.question('Type "reset" to proceed with migration-steps reset: ', (answer) => {
      resolve(answer.toLowerCase() === 'reset')
    })
  })
}

const resetMigrationSteps = async () => {
  try {
    const confirmed = await _confirmReset()
    if (!confirmed) {
      Logger.info('Reset operation cancelled')
      return
    }

    const stepsDir = path.join(__dirname, 'steps')
    const files = fs.readdirSync(stepsDir)
    files.forEach((file) => {
      if (file !== 'template.ts' && file.endsWith('.ts')) {
        fs.unlinkSync(path.join(stepsDir, file))
        Logger.info(`Removed migration file: ${file}`)
      }
    })

    // Truncate migration_steps table and reset the primary key
    await DB.tx(async (t) => {
      await t.none('TRUNCATE TABLE migrations.steps RESTART IDENTITY')
      Logger.info('Truncated migrations.steps table and reset primary key')
    })

    Logger.info('Migration steps reset completed successfully')
  } catch (error) {
    Logger.error('Error resetting migration steps:', error)
    throw error
  } finally {
    rl.close()
    await DB.$pool.end()
  }
}

Logger.info('Starting migration steps reset')
resetMigrationSteps()
  .then(() => {
    Logger.info('Migration steps reset finished')
    process.exit(0)
  })
  .catch(() => {
    process.exit(1)
  })

import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

import { DB } from 'server/db'
import { Logger } from 'server/utils/logger'

import { createMigrationStep } from './createMigrationStep'
import { getFilesToRemove, getMigrationFiles } from './utils'

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

const checkAllMigrationsRan = async () => {
  const files = getMigrationFiles()

  const dbMigrations = await DB.manyOrNone('select * from migrations.steps;')

  const missingMigrations = files.filter((file) => !dbMigrations.some((dbMigration) => dbMigration.name === file))

  if (missingMigrations.length > 0) {
    Logger.warn('The following migrations have not been run:')
    missingMigrations.forEach((file) => Logger.warn(`- ${file}`))
    return false
  }

  return true
}

const deleteOldMigrationFiles = (latestResetStep: string) => {
  const stepsDir = path.join(__dirname, 'steps')
  const filesToRemove = getFilesToRemove(latestResetStep)

  filesToRemove.forEach((file) => {
    fs.unlinkSync(path.join(stepsDir, file))
    Logger.info(`Removed migration file: ${file}`)
  })
}

const resetMigrationSteps = async () => {
  try {
    // === 1. Check if all migrations ran
    const allMigrationsRan = await checkAllMigrationsRan()
    if (!allMigrationsRan) {
      Logger.error('Not all migrations have been run. Please run all migrations before resetting.')
      return
    }

    // === 2. Confirm reset from user
    const confirmed = await _confirmReset()
    if (!confirmed) {
      Logger.info('Reset operation cancelled')
      return
    }

    // === 3. Create reset step
    const { filePath, fileName } = await createMigrationStep('reset')
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
    const resetStep = require(filePath).default

    await DB.tx(async (t) => {
      // === 4. Run reset step
      await resetStep(t, fileName)

      // === 5. Delete old migration files
      deleteOldMigrationFiles(fileName)
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

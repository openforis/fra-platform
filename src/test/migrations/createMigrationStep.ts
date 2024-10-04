import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs'
import * as path from 'path'

import { Logger } from 'server/utils/logger'

import { getUserInput } from './utils'

/**
 * Ask the user for the name of the migration step
 * @returns Migration step name
 */
const askStepName = (): Promise<string> => {
  return getUserInput('Please enter a name for the migration step: ')
}

/**
 * Get the current date in the format YYYYMMDDHHMMSS
 * @returns The current date in the format YYYYMMDDHHMMSS
 */
const getDate = (): string => {
  const now = new Date()
  return now
    .toISOString()
    .replace(/[-:T.]/g, '')
    .slice(0, 14)
}

export const createMigrationStep = async (initialStepName: string): Promise<{ fileName: string; filePath: string }> => {
  let stepName = initialStepName
  if (!stepName) {
    stepName = await askStepName()
    if (!stepName) {
      Logger.error('Migration step name cannot be empty. Exiting.')
      process.exit(1)
    }
  }

  const currentDir = __dirname

  const fileName = `${getDate()}-step-${stepName}.ts`
  const filePath = path.join(currentDir, 'steps', fileName)

  const template = stepName === 'reset' ? 'template-reset.ts' : 'template.ts'
  const templatePath = path.join(currentDir, 'steps', template)

  try {
    let content = fs.readFileSync(templatePath, 'utf8')
    content = content.replace(/#NAME#/g, stepName)

    fs.writeFileSync(filePath, content)
    Logger.info(`Created migration step ${filePath}`)
  } catch (error) {
    Logger.error('Error creating migration step:', error)
    process.exit(1)
  }

  return { fileName, filePath }
}

if (require.main === module) {
  const stepName = process.argv[2]
  createMigrationStep(stepName)
}

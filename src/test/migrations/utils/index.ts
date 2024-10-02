import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

/**
 * Get user input from the terminal
 * @param question - The question to ask the user
 * @returns The user input
 */
export const getUserInput = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

/**
 * Get the migration files from the migration steps directory
 * @param includeResetSteps - Whether to include reset steps in the list
 * @returns The migration files
 */
export const getMigrationFiles = (includeResetSteps = false): Array<string> => {
  const stepsDir = path.join(__dirname, '..', 'steps')
  return fs.readdirSync(stepsDir).filter((file) => {
    const isResetStep = file.includes('step-reset')
    return (
      file.endsWith('.ts') &&
      file !== 'template.ts' &&
      file !== 'template-reset.ts' &&
      (includeResetSteps || !isResetStep)
    )
  })
}

/**
 * Get the files to remove from the migration steps directory
 * @param latestResetStep - The name of the latest reset step
 * @returns The files to remove, excluding the latest reset step
 */
export const getFilesToRemove = (latestResetStep: string): Array<string> => {
  const allFiles = getMigrationFiles(true)
  return allFiles.filter((file) => file !== latestResetStep)
}

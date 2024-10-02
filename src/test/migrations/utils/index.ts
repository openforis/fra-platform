import * as fs from 'fs'
import * as path from 'path'

/**
 * Get the migration files from the migration steps directory
 * @param includeResetSteps - Whether to include reset steps in the list
 * @returns The migration files
 */
export const getMigrationFiles = (includeResetSteps = false): string[] => {
  const stepsDir = path.join(__dirname, 'steps')
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
export const getFilesToRemove = (latestResetStep: string): string[] => {
  const allFiles = getMigrationFiles(true)
  return allFiles.filter((file) => file !== latestResetStep)
}

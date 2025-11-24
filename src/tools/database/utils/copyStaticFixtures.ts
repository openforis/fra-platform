import * as fs from 'fs'
import * as path from 'path'

import { Logger } from 'server/utils/logger'

const STATIC_FIXTURES_DIR = path.join(__dirname, 'staticFixtures')

const _copyRecursive = (src: string, dest: string): void => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })

  entries.forEach((entry) => {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      _copyRecursive(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
      Logger.debug(`Copied static fixture: ${srcPath} --> ${destPath}`)
    }
  })
}

/**
 * Utility to copy static fixtures to fixtures folder (e.g. for test user)
 */
export const _copyStaticFixtures = (outputDir: string): void => {
  if (!fs.existsSync(STATIC_FIXTURES_DIR)) {
    Logger.debug('No static fixtures directory found, skipping')
    return
  }

  _copyRecursive(STATIC_FIXTURES_DIR, outputDir)
}

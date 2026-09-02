import readline from 'readline'

import { DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

const close = async (): Promise<void> => {
  await DB.$pool.end()
}

/**
 * Useful when running scripts in different environments
 *
 * @example
 * // generateCache:
 * const ENV_VARS = ['DATABASE_URL','REDIS_QUEUE_URL','REDIS_DATA_URL','PGSSL','REDIS_TLS_REJECT_UNAUTHORIZED','NODE_ENV']
 * await ToolsUtils.confirmVarsAndContinue(ENV_VARS)
 * // PGSSL: true
 * // REDIS_TLS_REJECT_UNAUTHORIZED: false
 * // ...
 * // [key]: [value]
 * // Press Enter to continue, or Ctrl+C to abort...
 */
const confirmVarsAndContinue = async (varNames: Array<string>): Promise<void> => {
  varNames.forEach((varName) => Logger.info(`${varName}: ${process.env[varName]}`))

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  await new Promise<void>((resolve) => {
    rl.question('\nPress Enter to continue, or Ctrl+C to abort...', () => {
      rl.close()
      resolve()
    })
  })
}

const DB_VAR_NAMES = [
  'DATABASE_URL',
  'REDIS_QUEUE_URL',
  'REDIS_DATA_URL',
  'PGSSL',
  'REDIS_TLS_REJECT_UNAUTHORIZED',
  'NODE_ENV',
]

const confirmDBVarsAndContinue = (): Promise<void> => confirmVarsAndContinue(DB_VAR_NAMES)

const exec = (fn: () => Promise<unknown>): void => {
  const start = new Date().getTime()
  Logger.info(`========== ******** Starting ${start}`)

  fn().then(async () => {
    await close()

    const end = new Date().getTime()
    Logger.info(`========== ******** Executed ${end} elapsed ${(end - start) / 1000}s`)
    process.exit(0)
  })
}

export const ToolsUtils = {
  close,
  confirmDBVarsAndContinue,
  confirmVarsAndContinue,
  exec,
}

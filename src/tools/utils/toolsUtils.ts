import { DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

const close = async (): Promise<void> => {
  await DB.$pool.end()
}

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
  exec,
}

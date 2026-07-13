import 'dotenv/config'
import 'tsconfig-paths/register'

import { createRequire } from 'node:module'

import { Logger } from './utils/logger'
import { NodeEnv, ProcessEnv } from './utils/processEnv'
import { serverInit } from './serverInit'

type VerifyLinksWorkerModule = {
  triggerVerifyLinksWorker: () => Promise<void>
}

const loadModule = createRequire(__filename)

serverInit()

if (ProcessEnv.nodeEnv === NodeEnv.development) {
  const { triggerVerifyLinksWorker } = loadModule(
    './worker/tasks/verifyLinks/triggerVerifyLinksWorker'
  ) as VerifyLinksWorkerModule

  void triggerVerifyLinksWorker().catch((error) => {
    Logger.error(`[verifyLinks] failed to start local worker: ${JSON.stringify(error)}`)
  })
}

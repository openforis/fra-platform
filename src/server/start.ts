import 'dotenv/config'
import 'tsconfig-paths/register'

import { Logger } from './utils/logger'
import { NodeEnv, ProcessEnv } from './utils/processEnv'
import { serverInit } from './serverInit'

serverInit()

if (ProcessEnv.nodeEnv === NodeEnv.development) {
  void import('./worker/tasks/verifyLinks/triggerVerifyLinksWorker')
    .then(({ triggerVerifyLinksWorker }) => triggerVerifyLinksWorker())
    .catch((error) => {
      Logger.error(`[verifyLinks] failed to start local worker: ${JSON.stringify(error)}`)
    })
}

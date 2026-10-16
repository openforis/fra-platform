import axios from 'axios'

import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'
import { NodeEnv } from 'server/utils/processEnv'
import { startVerifyLinksWorker } from 'server/worker/tasks/verifyLinks'
import { VerifyLinksWorkerPresence } from 'server/worker/tasks/verifyLinks/verifyLinksWorkerPresence'

let localWorkerStarted = false
let localWorkerStartPromise: Promise<void> | undefined

const _startVerifyLinksWorkerLocally = async (): Promise<void> => {
  if (localWorkerStarted) return
  if (localWorkerStartPromise) return localWorkerStartPromise

  localWorkerStartPromise = startVerifyLinksWorker({ exitOnIdle: false })
    .then(() => {
      localWorkerStarted = true
    })
    .catch((error) => {
      localWorkerStartPromise = undefined
      localWorkerStarted = false
      throw error
    })

  Logger.info('[verifyLinks] running worker locally')
  return localWorkerStartPromise
}

export const triggerVerifyLinksWorker = async (): Promise<void> => {
  if (ProcessEnv.nodeEnv === NodeEnv.development) {
    await _startVerifyLinksWorkerLocally()
    return
  }

  if (ProcessEnv.nodeEnv === NodeEnv.testE2e) {
    // A dedicated worker container already consumes the queue in e2e
    return
  }

  const startId = `verify-links-start-${Date.now()}-${Math.random()}`
  const lockAcquired = await VerifyLinksWorkerPresence.tryAcquireWorkerLock(startId)

  if (!lockAcquired) {
    Logger.debug('[verifyLinks] worker already active - skip starting dyno')
    return
  }

  try {
    if (!ProcessEnv.herokuApiKey || !ProcessEnv.herokuAppName) {
      throw new Error('Missing HEROKU_APP_NAME or HEROKU_API_KEY')
    }

    const url = `https://api.heroku.com/apps/${ProcessEnv.herokuAppName}/dynos`
    const payload = {
      attach: false,
      command: 'task_verifyLinks',
      type: 'run',
    }

    await axios.post(url, payload, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        Authorization: `Bearer ${ProcessEnv.herokuApiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'verify-links-trigger',
      },
    })

    Logger.info('[verifyLinks] worker dyno started')
  } catch (error) {
    await VerifyLinksWorkerPresence.clearWorkerLock()
    throw error
  }
}

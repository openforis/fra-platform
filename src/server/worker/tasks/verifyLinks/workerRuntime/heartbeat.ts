import { Logger } from 'server/utils/logger'
import { VerifyLinksWorkerPresence } from 'server/worker/tasks/verifyLinks/verifyLinksWorkerPresence'

// Refresh the worker presence lock so the web dyno won't start a second worker.
const workerHeartbeatMs = 60 * 1000

type Props = {
  workerId: string
}

export const startVerifyLinksWorkerHeartbeat = (props: Props): NodeJS.Timeout => {
  const { workerId } = props

  return setInterval(() => {
    void VerifyLinksWorkerPresence.refreshWorkerLock(workerId).catch((error) => {
      Logger.error(`[verifyLinks-worker] heartbeat failed: ${JSON.stringify(error)}`)
    })
  }, workerHeartbeatMs)
}

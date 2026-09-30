import { Queue, Worker } from 'bullmq'

import { RedisQueueClient } from 'server/redis/queueClient'
import { Logger } from 'server/utils/logger'
import { VerifyLinksQueueProps } from 'server/worker/tasks/verifyLinks/props'
import { VerifyLinksWorkerPresence } from 'server/worker/tasks/verifyLinks/verifyLinksWorkerPresence'

type Props = {
  exitOnIdle: boolean
  queue: Queue<VerifyLinksQueueProps>
  reason: string
  worker: Worker<VerifyLinksQueueProps>
}

export const shutdownVerifyLinksWorker = async (props: Props): Promise<void> => {
  const { exitOnIdle, queue, reason, worker } = props

  // Force close in dev to avoid lingering instances
  const forceClose = !exitOnIdle && (reason === 'SIGTERM' || reason === 'SIGINT')
  await worker.close(forceClose)

  // Always close connections on shutdown so dev restarts don't leave a stale worker running.
  await Promise.allSettled([VerifyLinksWorkerPresence.clearWorkerLock(), queue.close()])
  // Shared connection: quit only after everything using it is done
  await Promise.allSettled([RedisQueueClient.getInstance().quit()])

  Logger.info(`[verifyLinks-worker] shutdown (${reason})`)

  if (exitOnIdle || reason === 'SIGTERM' || reason === 'SIGINT') {
    process.exit(0)
  }
}

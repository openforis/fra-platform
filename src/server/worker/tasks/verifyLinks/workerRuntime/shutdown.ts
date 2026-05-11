import { Queue, Worker } from 'bullmq'

import { Logger } from 'server/utils/logger'
import { VerifyLinksQueueProps } from 'server/worker/tasks/verifyLinks/props'
import { VerifyLinksWorkerPresence } from 'server/worker/tasks/verifyLinks/verifyLinksWorkerPresence'
import { VerifyLinksQueueFactory } from 'server/worker/tasks/verifyLinks/visitCycleLinks/queueFactory'
import { WorkerFactory } from 'server/worker/tasks/verifyLinks/visitCycleLinks/workerFactory'

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
  await Promise.allSettled([
    VerifyLinksWorkerPresence.clearWorkerLock(),
    queue.close(),
    VerifyLinksWorkerPresence.disconnect(),
    VerifyLinksQueueFactory.connection.quit(),
    WorkerFactory.connection.quit(),
  ])

  Logger.info(`[verifyLinks-worker] shutdown (${reason})`)

  if (exitOnIdle || reason === 'SIGTERM' || reason === 'SIGINT') {
    process.exit(0)
  }
}

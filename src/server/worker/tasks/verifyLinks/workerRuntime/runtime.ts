import http from 'http'

import { SocketServer } from 'server/service/socket'
import { VerifyLinksWorkerPresence } from 'server/worker/tasks/verifyLinks/verifyLinksWorkerPresence'
import { VerifyLinksQueueFactory } from 'server/worker/tasks/verifyLinks/visitCycleLinks/queueFactory'
import { WorkerFactory } from 'server/worker/tasks/verifyLinks/visitCycleLinks/workerFactory'

import { startVerifyLinksWorkerHeartbeat } from './heartbeat'
import { createVerifyLinksIdleMonitor } from './idleMonitor'
import { verifyLinksWorkerProcessor } from './processor'
import { shutdownVerifyLinksWorker } from './shutdown'

type Props = {
  exitOnIdle: boolean
  standalone: boolean
  workerId: string
}

export const startVerifyLinksWorkerRuntime = async (props: Props): Promise<void> => {
  const { exitOnIdle, standalone, workerId } = props

  const queue = VerifyLinksQueueFactory.getInstance()

  // Init socketserver for standalone workers (e.g. Heroku, E2E)
  if (standalone) {
    await SocketServer.init(http.createServer())
  }

  // Mark this worker as active in Redis so new requests won’t start another dyno.
  await VerifyLinksWorkerPresence.refreshWorkerLock(workerId)

  const heartbeatInterval = startVerifyLinksWorkerHeartbeat({ workerId })

  const worker = WorkerFactory.newInstance({
    key: VerifyLinksQueueFactory.queueName,
    processor: verifyLinksWorkerProcessor,
  })

  let shuttingDown = false
  const intervals: { heartbeat: NodeJS.Timeout; idle?: NodeJS.Timeout } = { heartbeat: heartbeatInterval }

  const shutdown = async (reason: string): Promise<void> => {
    if (shuttingDown) return
    shuttingDown = true

    clearInterval(intervals.heartbeat)
    if (intervals.idle) clearInterval(intervals.idle)

    await shutdownVerifyLinksWorker({ exitOnIdle, queue, reason, worker })
  }

  const idleMonitor = createVerifyLinksIdleMonitor({
    exitOnIdle,
    isShuttingDown: () => shuttingDown,
    onIdle: () => shutdown('idle'),
    queue,
  })

  const resetIdle = (): void => {
    idleMonitor.reset()
  }

  worker.on('active', resetIdle)
  worker.on('completed', resetIdle)
  worker.on('failed', resetIdle)

  intervals.idle = idleMonitor.start()

  process.on('SIGTERM', () => {
    void shutdown('SIGTERM')
  })
  process.on('SIGINT', () => {
    void shutdown('SIGINT')
  })

  await idleMonitor.checkNow()
}

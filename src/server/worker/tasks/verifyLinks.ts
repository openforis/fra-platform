import http from 'http'

import { VisitCycleLinksJob } from 'server/controller/cycleData/links/visitCycleLinks'
import { VisitCycleLinksQueueFactory } from 'server/controller/cycleData/links/visitCycleLinks/queueFactory'
import { WorkerFactory } from 'server/controller/cycleData/links/visitCycleLinks/workerFactory'
import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'
import { VerifyLinksJob } from 'server/worker/tasks/verifyLinksJob'
import { VerifyLinksWorkerPresence } from 'server/worker/tasks/verifyLinksWorkerPresence'

// One minute idle time before shutdown
const idleGraceMs = 60 * 1000
const idleCheckIntervalMs = 15 * 1000

const isMainProcess = require.main === module

type StartOptions = {
  exitOnIdle?: boolean
}

const processor = async (job: VisitCycleLinksJob): Promise<void> => {
  const { assessment, cycle } = job.data
  const verifyLinksJob = new VerifyLinksJob({ assessment, cycle })
  await verifyLinksJob.runFromQueue(job)
}

export const startVerifyLinksWorker = async (options: StartOptions = {}): Promise<void> => {
  const exitOnIdle = options.exitOnIdle ?? isMainProcess
  const workerId = `verify-links-${process.pid}-${Date.now()}`

  const queue = VisitCycleLinksQueueFactory.getInstance()

  if (exitOnIdle) {
    await SocketServer.init(http.createServer())
  }

  await VerifyLinksWorkerPresence.refreshWorkerLock(workerId)

  const worker = WorkerFactory.newInstance({
    key: VisitCycleLinksQueueFactory.queueName,
    processor,
  })

  let idleSince: number | null = null
  let isCheckingIdle = false
  let shuttingDown = false
  const idleIntervalRef: { current?: NodeJS.Timeout } = {}

  const shutdown = async (reason: string): Promise<void> => {
    if (shuttingDown) return
    shuttingDown = true

    if (idleIntervalRef.current) {
      clearInterval(idleIntervalRef.current)
    }

    await worker.close()
    await VerifyLinksWorkerPresence.clearWorkerLock()

    if (exitOnIdle) {
      await queue.close()
      await VerifyLinksWorkerPresence.disconnect()
      Logger.info(`[verifyLinks-worker] shutdown (${reason})`)
      process.exit(0)
    }
  }

  const checkIdle = async (): Promise<void> => {
    if (isCheckingIdle || shuttingDown) return
    isCheckingIdle = true

    try {
      const counts = await queue.getJobCounts('waiting', 'active', 'delayed')
      const pendingJobs = counts.waiting + counts.active + counts.delayed

      if (pendingJobs === 0) {
        if (!idleSince) idleSince = Date.now()
        const idleForMs = Date.now() - idleSince
        if (idleForMs >= idleGraceMs) {
          await shutdown('idle')
        }
      } else {
        idleSince = null
      }
    } finally {
      isCheckingIdle = false
    }
  }

  idleIntervalRef.current = setInterval(() => {
    void checkIdle()
  }, idleCheckIntervalMs)

  worker.on('active', () => {
    idleSince = null
  })
  worker.on('completed', () => {
    idleSince = null
  })
  worker.on('failed', () => {
    idleSince = null
  })

  process.on('SIGTERM', () => {
    void shutdown('SIGTERM')
  })
  process.on('SIGINT', () => {
    void shutdown('SIGINT')
  })

  await checkIdle()
}

if (isMainProcess) {
  startVerifyLinksWorker({ exitOnIdle: true }).catch((error) => {
    Logger.error(`[verifyLinks-worker] failed to start: ${JSON.stringify(error)}`)
    process.exit(1)
  })
}

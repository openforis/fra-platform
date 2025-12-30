import http from 'http'

import { VisitCycleLinksJob } from 'server/controller/cycleData/links/visitCycleLinks'
import { VisitCycleLinksQueueFactory } from 'server/controller/cycleData/links/visitCycleLinks/queueFactory'
import { WorkerFactory } from 'server/controller/cycleData/links/visitCycleLinks/workerFactory'
import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'
import { VerifyLinksJob } from 'server/worker/tasks/verifyLinksJob'
import { VerifyLinksWorkerPresence } from 'server/worker/tasks/verifyLinksWorkerPresence'

/**
 * The plan:
 * - Queue verify-links jobs in the main web process and keep them using Redis, then
 *   spin up a dedicated Heroku dyno to consume them.
 * - Only one dyno should run at a time. If one is already active, new requests are
 *   just added to the queue.
 * - The worker runs with concurrency=1, so the jobs are run sequentially. There will
 *   be a single queue for all link jobs, regardless of assessment/cycle. Then the
 *   worker shuts itself down after the queue stays empty for a brief idle grace period.
 * - The job status is stored in Redis keyed by assessment/cycle so the admin status
 *   endpoint can report queued/running/success/failed per assessment/cycle. That's
 *   also necessary so we can disable the Verify Links button per assessment. (We will
 *   add a countryIso to the key in the future).
 */

// Idle grace period to keep dyno alive briefly for possible new incoming jobs.
const idleGraceMs = 60 * 1000
// Interval time to check if the process is idle and can be shut down.
const idleCheckIntervalMs = 15 * 1000
// Refresh the worker presence lock so the web dyno won't start a second worker.
const workerHeartbeatMs = 60 * 1000

const isMainProcess = require.main === module

// Exit on idle option, set to false for dev so the local server can keep running.
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

  // Init SocketServer only for the worker dyno so it can emit events.
  if (exitOnIdle) {
    await SocketServer.init(http.createServer())
  }

  // Mark this worker as active in Redis so new requests won’t start another dyno.
  await VerifyLinksWorkerPresence.refreshWorkerLock(workerId)

  const heartbeatIntervalRef: { current?: NodeJS.Timeout } = {}
  heartbeatIntervalRef.current = setInterval(() => {
    void VerifyLinksWorkerPresence.refreshWorkerLock(workerId).catch((error) => {
      Logger.error(`[verifyLinks-worker] heartbeat failed: ${JSON.stringify(error)}`)
    })
  }, workerHeartbeatMs)

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

    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current)
    }
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
        // Queue is empty, so shutdown if the grace period has passed.
        if (!idleSince) idleSince = Date.now()
        const idleForMs = Date.now() - idleSince
        if (exitOnIdle && idleForMs >= idleGraceMs) {
          await shutdown('idle')
        }
      } else {
        idleSince = null
      }
    } finally {
      isCheckingIdle = false
    }
  }

  // Check idle periodically.
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

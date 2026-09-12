import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'
import { NodeEnv } from 'server/utils/processEnv'
import { startVerifyLinksWorkerRuntime } from 'server/worker/tasks/verifyLinks/workerRuntime/runtime'

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
 *   endpoint can report queued/running/success/failed per assessment/cycle, or
 *   assessment/cycle/countryIso.
 */

const isMainProcess = require.main === module

// Exit on idle option, set to false for dev so the local server can keep running.
type StartOptions = {
  exitOnIdle?: boolean
}

export const startVerifyLinksWorker = async (options: StartOptions = {}): Promise<void> => {
  const exitOnIdle = options.exitOnIdle ?? isMainProcess
  const workerId = `verify-links-${process.pid}-${Date.now()}`
  // standalone (Heroku dyno or e2e worker container)
  // has no other SocketServer instance running
  await startVerifyLinksWorkerRuntime({ exitOnIdle, standalone: isMainProcess, workerId })
}

if (isMainProcess) {
  // keep alive in CI E2E
  const exitOnIdle = ProcessEnv.nodeEnv !== NodeEnv.testE2e
  startVerifyLinksWorker({ exitOnIdle }).catch((error) => {
    Logger.error(`[verifyLinks-worker] failed to start: ${JSON.stringify(error)}`)
    process.exit(1)
  })
}

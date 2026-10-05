import { Queue } from 'bullmq'

import { VerifyLinksQueueProps } from 'server/worker/tasks/verifyLinks/props'

// Idle grace period to keep dyno alive briefly for possible new incoming jobs.
const idleGraceMs = 60 * 1000
// Interval time to check if the process is idle and can be shut down.
const idleCheckIntervalMs = 15 * 1000

type Props = {
  exitOnIdle: boolean
  isShuttingDown: () => boolean
  onIdle: () => Promise<void>
  queue: Queue<VerifyLinksQueueProps>
}

type VerifyLinksIdleMonitor = {
  checkNow: () => Promise<void>
  reset: () => void
  start: () => NodeJS.Timeout
}

export const createVerifyLinksIdleMonitor = (props: Props): VerifyLinksIdleMonitor => {
  const { exitOnIdle, isShuttingDown, onIdle, queue } = props

  let idleSince: number | null = null
  let isCheckingIdle = false

  const reset = (): void => {
    idleSince = null
  }

  const checkNow = async (): Promise<void> => {
    if (isCheckingIdle || isShuttingDown()) return
    isCheckingIdle = true

    try {
      const counts = await queue.getJobCounts('waiting', 'active', 'delayed')
      const pendingJobs = counts.waiting + counts.active + counts.delayed

      if (pendingJobs === 0) {
        // Queue is empty, so shutdown if the grace period has passed.
        if (!idleSince) idleSince = Date.now()
        const idleForMs = Date.now() - idleSince

        if (exitOnIdle && idleForMs >= idleGraceMs) {
          await onIdle()
        }
      } else {
        idleSince = null
      }
    } finally {
      isCheckingIdle = false
    }
  }

  // Check idle periodically.
  const start = (): NodeJS.Timeout =>
    setInterval(() => {
      void checkNow()
    }, idleCheckIntervalMs)

  return { checkNow, reset, start }
}

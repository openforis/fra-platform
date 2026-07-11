import { Worker, WorkerOptions } from 'bullmq'
import IORedis from 'ioredis'

import { LinksVerificationEvent } from 'meta/socket/event/links'

import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'
import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'
import { VerifyLinksQueueJob, VerifyLinksQueueProps } from 'server/worker/tasks/verifyLinks/props'
import { emitLinksVerificationEvent } from 'server/worker/tasks/verifyLinks/utils/emitLinksVerificationEvent'
import { insertLinksCheckActivityLog } from 'server/worker/tasks/verifyLinks/utils/insertLinksCheckActivityLog'

import { VerifyAllLinksJob } from './props'

const connection = new IORedis(ProcessEnv.redisQueueUrl, { maxRetriesPerRequest: null })

const jobTimeoutMs = 10 * 60 * 1000

const workerOptions: WorkerOptions = {
  concurrency: 1,
  connection,
  lockDuration: jobTimeoutMs,
  maxStalledCount: 0,
  skipLockRenewal: true,
}

// BullMQ accepts either a processor function (dev) or a path to compiled JS (prod).
type VerifyLinksProcessor = string | ((job: VerifyLinksQueueJob) => Promise<void>)

const _isVerifyAllLinksJob = (job: VerifyLinksQueueJob): job is VerifyAllLinksJob =>
  job.name === VerifyLinksJobName.verifyAllLinks

const newInstance = (props: { key: string; processor: VerifyLinksProcessor }): Worker<VerifyLinksQueueProps> => {
  const { key, processor } = props

  const worker = new Worker<VerifyLinksQueueProps>(key, processor, workerOptions)

  worker.on('error', (error) => {
    Logger.error(`[visitCycleLinks-worker] job error ${error}`)
  })

  worker.on('active', async (job) => {
    if (!_isVerifyAllLinksJob(job)) return

    const { assessment, countryIso, cycle } = job.data
    emitLinksVerificationEvent({ assessment, countryIso, cycle, event: LinksVerificationEvent.active })
  })

  worker.on('completed', async (job) => {
    if (!_isVerifyAllLinksJob(job)) {
      Logger.debug(`[visitDescriptionLinks-worker] [job-${job.id}] completed`)
      return
    }

    const { assessment, countryIso, cycle, user } = job.data

    emitLinksVerificationEvent({ assessment, countryIso, cycle, event: LinksVerificationEvent.completed })

    await insertLinksCheckActivityLog({ assessment, countryIso, cycle, status: 'completed', user })

    Logger.debug(`[visitCycleLinks-worker] [job-${job.id}] completed`)
  })

  worker.on('failed', async (job, error) => {
    if (!job || !_isVerifyAllLinksJob(job)) {
      Logger.debug(`[visitDescriptionLinks-worker] job failed with error: ${error}`)
      return
    }

    const { assessment, countryIso, cycle, user } = job.data

    emitLinksVerificationEvent({ assessment, countryIso, cycle, event: LinksVerificationEvent.failed })

    await insertLinksCheckActivityLog({ assessment, countryIso, cycle, error, status: 'failed', user })

    Logger.debug(`[visitCycleLinks-worker] job failed with error: ${error}`)
  })

  return worker
}

export const WorkerFactory = {
  connection,
  newInstance,
}

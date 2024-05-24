import { Worker, WorkerOptions } from 'bullmq'
import IORedis from 'ioredis'

import { ActivityLogMessage } from 'meta/assessment'
import { SectionNames } from 'meta/routes/sectionNames'

import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

import { VisitCycleLinksProps } from './props'
import workerProcessor from './worker'

const connection = new IORedis(ProcessEnv.redisQueueUrl)

const workerOptions: WorkerOptions = {
  concurrency: 1,
  connection,
  lockDuration: 60_000,
  maxStalledCount: 0,
}

const newInstance = (props: { key: string }) => {
  const { key } = props

  const worker = new Worker<VisitCycleLinksProps>(key, workerProcessor, workerOptions)

  worker.on('error', (error) => {
    Logger.error(`[visitCycleLinks-worker] job error ${error}`)
  })

  worker.on('completed', async (job) => {
    const { assessment, cycle, user } = job.data

    const target = { jobStatus: 'completed' }
    const message = ActivityLogMessage.linksCheckCompleted
    const section = SectionNames.Admin.links
    const activityLog = { message, section, target, user }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams)

    Logger.debug(`[visitCycleLinks-worker] [job-${job.id}] completed`)
  })

  worker.on('failed', async (job, error) => {
    const { assessment, cycle, user } = job.data

    const target = { error, jobStatus: 'failed' }
    const message = ActivityLogMessage.linksCheckFailed
    const section = SectionNames.Admin.links
    const activityLog = { message, section, target, user }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams)

    Logger.debug(`[visitCycleLinks-worker] job failed with error: ${error}`)
  })

  return worker
}

export const WorkerFactory = {
  connection,
  newInstance,
}

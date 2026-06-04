import { Worker, WorkerListener, WorkerOptions } from 'bullmq'
import IORedis from 'ioredis'

import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionNames } from 'meta/routes/sectionNames'
import { Sockets } from 'meta/socket/sockets'

import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { SocketServer } from 'server/service/socket'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'
import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'
import { VerifyLinksQueueJob, VerifyLinksQueueProps } from 'server/worker/tasks/verifyLinks/props'

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

type EmitEventProps = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
  event: keyof WorkerListener
}

// BullMQ accepts either a processor function (dev) or a path to compiled JS (prod).
type VerifyLinksProcessor = string | ((job: VerifyLinksQueueJob) => Promise<void>)

const _emitEvent = (props: EmitEventProps): void => {
  const { assessment, countryIso, cycle, event } = props
  const linksVerificationEvent = Sockets.getLinksVerificationEvent({
    assessmentName: assessment.props.name,
    countryIso,
    cycleName: cycle.name,
  })
  SocketServer.emit(linksVerificationEvent, { event })
}

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
    _emitEvent({ assessment, countryIso, cycle, event: 'active' })
  })

  worker.on('completed', async (job) => {
    if (!_isVerifyAllLinksJob(job)) {
      Logger.debug(`[visitDescriptionLinks-worker] [job-${job.id}] completed`)
      return
    }

    const { assessment, countryIso, cycle, user } = job.data

    _emitEvent({ assessment, countryIso, cycle, event: 'completed' })

    const target = { jobStatus: 'completed' }
    const message = ActivityLogMessage.linksCheckComplete
    const section = SectionNames.Admin.links
    const activityLog = { countryIso, message, section, target, user }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams)

    Logger.debug(`[visitCycleLinks-worker] [job-${job.id}] completed`)
  })

  worker.on('failed', async (job, error) => {
    if (!job || !_isVerifyAllLinksJob(job)) {
      Logger.debug(`[visitDescriptionLinks-worker] job failed with error: ${error}`)
      return
    }

    const { assessment, countryIso, cycle, user } = job.data

    _emitEvent({ assessment, countryIso, cycle, event: 'failed' })

    const target = { error, jobStatus: 'failed' }
    const message = ActivityLogMessage.linksCheckFail
    const section = SectionNames.Admin.links
    const activityLog = { countryIso, message, section, target, user }
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

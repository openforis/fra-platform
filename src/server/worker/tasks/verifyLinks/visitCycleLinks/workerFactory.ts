import { Worker, WorkerListener, WorkerOptions } from 'bullmq'

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
import { RedisClient } from 'server/utils/redisClient'

import { VisitCycleLinksJob, VisitCycleLinksProps } from './props'

const connection = RedisClient.create(ProcessEnv.redisQueueUrl, { maxRetriesPerRequest: null })

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
type VisitCycleLinksProcessor = string | ((job: VisitCycleLinksJob) => Promise<void>)

const _emitEvent = (props: EmitEventProps): void => {
  const { assessment, countryIso, cycle, event } = props
  const linksVerificationEvent = Sockets.getLinksVerificationEvent({
    assessmentName: assessment.props.name,
    countryIso,
    cycleName: cycle.name,
  })
  SocketServer.emit(linksVerificationEvent, { event })
}

const newInstance = (props: { key: string; processor: VisitCycleLinksProcessor }): Worker<VisitCycleLinksProps> => {
  const { key, processor } = props

  const worker = new Worker<VisitCycleLinksProps>(key, processor, workerOptions)

  worker.on('error', (error) => {
    Logger.error(`[visitCycleLinks-worker] job error ${error}`)
  })

  worker.on('active', async (job) => {
    const { assessment, countryIso, cycle } = job.data
    _emitEvent({ assessment, countryIso, cycle, event: 'active' })
  })

  worker.on('completed', async (job) => {
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

import { Worker, WorkerListener, WorkerOptions } from 'bullmq'
import IORedis from 'ioredis'

import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { SectionNames } from 'meta/routes/sectionNames'
import { Sockets } from 'meta/socket'

import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { SocketServer } from 'server/service/socket'
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

type EmitEventProps = {
  assessment: Assessment
  cycle: Cycle
  event: keyof WorkerListener
}

const _emitEvent = (props: EmitEventProps) => {
  const { assessment, cycle, event } = props
  const linksVerificationEvent = Sockets.getLinksVerificationEvent({
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
  })
  SocketServer.emit(linksVerificationEvent, { event })
}

const newInstance = (props: { key: string }) => {
  const { key } = props

  const worker = new Worker<VisitCycleLinksProps>(key, workerProcessor, workerOptions)

  worker.on('error', (error) => {
    Logger.error(`[visitCycleLinks-worker] job error ${error}`)
  })

  worker.on('active', async (job) => {
    const { assessment, cycle } = job.data
    _emitEvent({ assessment, cycle, event: 'active' })
  })

  worker.on('completed', async (job) => {
    const { assessment, cycle, user } = job.data

    _emitEvent({ assessment, cycle, event: 'completed' })

    const target = { jobStatus: 'completed' }
    const message = ActivityLogMessage.linksCheckComplete
    const section = SectionNames.Admin.links
    const activityLog = { message, section, target, user }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams)

    Logger.debug(`[visitCycleLinks-worker] [job-${job.id}] completed`)
  })

  worker.on('failed', async (job, error) => {
    const { assessment, cycle, user } = job.data

    _emitEvent({ assessment, cycle, event: 'failed' })

    const target = { error, jobStatus: 'failed' }
    const message = ActivityLogMessage.linksCheckFail
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

import { Job, Worker, WorkerOptions } from 'bullmq'
import IORedis from 'ioredis'

import { NodeUpdates } from 'meta/data'
import { Sockets } from 'meta/socket'

import { SocketServer } from 'server/service/socket'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'
import { NodeEnv } from 'server/utils/processEnv'

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

  const processor = ProcessEnv.nodeEnv === NodeEnv.development ? workerProcessor : `${__dirname}/worker`
  const worker = new Worker(key, processor, workerOptions)

  worker.on('completed', (job: Job, result: { nodeUpdates: NodeUpdates }) => {
    const { nodeUpdates } = result
    const { assessment, cycle, countryIso } = nodeUpdates

    const propsEvent = { countryIso, assessmentName: assessment.props.name, cycleName: cycle.name }
    const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)
    SocketServer.emit(nodeUpdateEvent, { nodeUpdates })

    Logger.debug(
      `[updateDependencies-worker] [job-${job.id}] complete received with ${nodeUpdates.nodes.length} nodes updated`
    )
  })

  worker.on('error', (error) => {
    Logger.error(`[updateDependencies-worker] job error ${error}`)
  })

  return worker
}

export const WorkerFactory = {
  connection,
  newInstance,
}

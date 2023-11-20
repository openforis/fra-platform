import { Worker, WorkerOptions } from 'bullmq'
import IORedis from 'ioredis'

import { Sockets } from 'meta/socket'

import { SocketServer } from 'server/service/socket'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'
import { NodeEnv } from 'server/utils/processEnv'

import { UpdateDependenciesProps, UpdateDependenciesResult } from './props'
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
  const worker = new Worker<UpdateDependenciesProps, UpdateDependenciesResult>(key, processor, workerOptions)

  worker.on('completed', (job, result) => {
    const { nodeUpdates } = result
    const { assessmentName, cycleName, countryIso } = nodeUpdates

    const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent({ assessmentName, cycleName, countryIso })
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

import { Worker } from 'bullmq'
import IORedis from 'ioredis'

import { NodeUpdates } from 'meta/data'
import { Sockets } from 'meta/socket'

import { SocketServer } from 'server/service/socket'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'
import { NodeEnv } from 'server/utils/processEnv'

import workerProcessor from './worker'

const connection = new IORedis(ProcessEnv.redisUrl)

const newInstance = (props: { key: string }) => {
  const { key } = props

  const processor = ProcessEnv.nodeEnv === NodeEnv.development ? workerProcessor : `${__dirname}/worker`
  const opts = {
    concurrency: 1,
    connection,
    lockDuration: 60_000,
    maxStalledCount: 0,
  }
  const worker = new Worker(key, processor, opts)

  worker.on('completed', (job, result: { nodeUpdates: NodeUpdates }) => {
    const { nodeUpdates } = result
    const { assessment, cycle, countryIso } = nodeUpdates

    const propsEvent = { countryIso, assessmentName: assessment.props.name, cycleName: cycle.name }
    const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)
    SocketServer.emit(nodeUpdateEvent, { nodeUpdates })

    // Update validations
    // if (!Objects.isEmpty(validations.nodes)) {
    //   const nodeValidationsUpdateEvent = Sockets.getNodeValidationsUpdateEvent(propsEvent)
    //   SocketServer.emit(nodeValidationsUpdateEvent, { validations })
    // }
    Logger.debug(
      `[calculateAndValidateDependentNodesWorker] job-${job.id} completed. ${nodeUpdates.nodes.length} nodes updated`
    )
  })

  worker.on('error', (error) => {
    Logger.error(`[calculateAndValidateDependentNodesWorker] job error ${error}`)
  })

  return worker
}

export const WorkerFactory = {
  connection,
  newInstance,
}

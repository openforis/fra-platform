import { Objects } from '@utils/objects'
import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { NodeUpdates } from '@meta/data'
import { Sockets } from '@meta/socket'

import { SocketServer } from '@server/service/socket'
import { ProcessEnv } from '@server/utils'
import { Logger } from '@server/utils/logger'

import { DependantsUpdateProps } from './props'

const queues: Record<string, Queue<DependantsUpdateProps>> = {}
const workers: Record<string, Worker<DependantsUpdateProps>> = {}

export const getInstance = (props: {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}): Queue<DependantsUpdateProps> => {
  const { assessment, cycle, countryIso } = props

  const key = `persistNodeValue/dependenciesUpdate/${assessment.props.name}/${cycle.name}/${countryIso}`
  let queue = queues[key]

  if (queue) return queue

  const worker = new Worker(key, `${__dirname}/workers/updateDependenciesWorker`, {
    concurrency: 1,
    maxStalledCount: 0,
    lockDuration: 60_000,
    connection: new IORedis(ProcessEnv.redisUrl),
  })
  worker.on('completed', (_, result: Array<{ nodeUpdates: NodeUpdates; validations: NodeUpdates }>) => {
    const { assessment, cycle, countryIso } = result[0].nodeUpdates
    const { nodeUpdates, validations } = result.reduce<{ nodeUpdates: NodeUpdates; validations: NodeUpdates }>(
      (acc, item) => {
        acc.nodeUpdates.nodes.push(...item.nodeUpdates.nodes)
        acc.validations.nodes.push(...item.validations.nodes)
        return acc
      },
      {
        nodeUpdates: { assessment, cycle, countryIso, nodes: [] },
        validations: { assessment, cycle, countryIso, nodes: [] },
      }
    )

    const propsEvent = { countryIso, assessmentName: assessment.props.name, cycleName: cycle.name }
    const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)
    SocketServer.emit(nodeUpdateEvent, { nodeUpdates })

    // Update validations
    if (!Objects.isEmpty(validations.nodes)) {
      const nodeValidationsUpdateEvent = Sockets.getNodeValidationsUpdateEvent(propsEvent)
      SocketServer.emit(nodeValidationsUpdateEvent, { validations })
    }
    Logger.debug(
      `[calculateAndValidateDependentNodesWorker] job completed ${nodeUpdates.nodes.length} nodes updated,  ${validations.nodes.length} nodes updated`
    )
  })
  worker.on('error', (error) => {
    Logger.error(`[calculateAndValidateDependentNodesWorker] job error ${error}`)
  })
  workers[key] = worker

  queue = new Queue<DependantsUpdateProps>(key, { connection: new IORedis(ProcessEnv.redisUrl) })
  queues[key] = queue

  return queue
}

process.on('SIGTERM', async () => {
  await Promise.all(Object.values(workers).map((worker) => worker.close()))

  Logger.debug('[calculateAndValidateDependentNodesWorkers] all workers closed')
})

export const QueueFactory = {
  getInstance,
}

import { Worker, WorkerOptions } from 'bullmq'

import { Country } from 'meta/area/country'
import { NodeUpdates } from 'meta/data/nodeUpdates'
import { Sockets } from 'meta/socket/sockets'
import { User } from 'meta/user/user'

import { AssessmentController } from 'server/controller/assessment'
import { UpdateDependenciesWorker } from 'server/controller/cycleData/tableData/updateDependencies/props'
import { scheduleUpdateDependencies } from 'server/controller/cycleData/tableData/updateDependencies/scheduleUpdateDependencies'
import workerProcessor from 'server/controller/cycleData/tableData/updateDependencies/worker'
import { SocketServer } from 'server/service/socket'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'
import { NodeEnv } from 'server/utils/processEnv'
import { RedisClient } from 'server/utils/redis/client'

const connection = RedisClient.newInstance(ProcessEnv.redisQueueUrl)
const workerOptions: WorkerOptions = {
  concurrency: 1,
  connection,
  lockDuration: 60_000,
  maxStalledCount: 0,
}

const _scheduleExternalDependantsUpdate = async (props: {
  logKey: string
  country: Country
  nodeUpdates: NodeUpdates
  user: User
}): Promise<void> => {
  const { country, logKey, nodeUpdates, user } = props

  const { assessmentName, cycleName } = nodeUpdates

  const propsAssessment = { assessmentName, cycleName, metaCache: true }
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(propsAssessment)

  if (country) {
    Logger.info(`${logKey} scheduling updates ${assessmentName}-${cycleName} of ${nodeUpdates.nodes.length} nodes.`)
    await scheduleUpdateDependencies({ assessment, cycle, country, nodeUpdates, includeSourceNodes: true, user })
  }
}

const newInstance = (props: { key: string }): UpdateDependenciesWorker => {
  const { key } = props

  const processor = ProcessEnv.nodeEnv === NodeEnv.development ? workerProcessor : `${__dirname}/worker`
  const worker: UpdateDependenciesWorker = new Worker(key, processor, workerOptions)

  worker.on('completed', async (job, result) => {
    const { country, user } = job.data
    const { externalDependants, nodeUpdates } = result
    const { assessmentName, countryIso, cycleName } = nodeUpdates

    const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent({ assessmentName, cycleName, countryIso })
    SocketServer.emit(nodeUpdateEvent, { nodeUpdates })

    externalDependants.forEach((externalNodeUpdates) =>
      // schedule external assessment/cycle updates
      _scheduleExternalDependantsUpdate({
        logKey: `[updateDependencies-worker] [job-${job.id}]`,
        country,
        nodeUpdates: externalNodeUpdates,
        user,
      })
    )

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

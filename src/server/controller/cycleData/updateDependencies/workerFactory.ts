import { Worker, WorkerOptions } from 'bullmq'
import IORedis from 'ioredis'

import { NodeUpdates } from 'meta/data'
import { Sockets } from 'meta/socket'
import { User } from 'meta/user'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { scheduleUpdateDependencies } from 'server/controller/cycleData/updateDependencies/scheduleUpdateDependencies'
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

const _scheduleExternalDependantsUpdate = async (props: {
  logKey: string
  nodeUpdates: NodeUpdates
  user: User
}): Promise<void> => {
  const { logKey, nodeUpdates, user } = props

  const { assessmentName, cycleName, countryIso } = nodeUpdates

  const propsAssessment = { assessmentName, cycleName, metaCache: true }
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(propsAssessment)
  const country = await AreaController.getCountry({ assessment, cycle, countryIso })

  if (country) {
    Logger.info(`${logKey} scheduling updates ${assessmentName}-${cycleName} of ${nodeUpdates.nodes.length} nodes.`)
    await scheduleUpdateDependencies({ assessment, cycle, nodeUpdates, includeSourceNodes: true, user })
  }
}

const newInstance = (props: { key: string }) => {
  const { key } = props

  const processor = ProcessEnv.nodeEnv === NodeEnv.development ? workerProcessor : `${__dirname}/worker`
  const worker = new Worker<UpdateDependenciesProps, UpdateDependenciesResult>(key, processor, workerOptions)

  worker.on('completed', async (job, result) => {
    const { user } = job.data
    const { externalDependants, nodeUpdates } = result
    const { assessmentName, cycleName, countryIso } = nodeUpdates

    const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent({ assessmentName, cycleName, countryIso })
    SocketServer.emit(nodeUpdateEvent, { nodeUpdates })

    externalDependants.forEach((externalNodeUpdates) =>
      // schedule external assessment/cycle updates
      _scheduleExternalDependantsUpdate({
        logKey: `[updateDependencies-worker] [job-${job.id}]`,
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

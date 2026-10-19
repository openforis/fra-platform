import { NodeUpdates } from 'meta/data/nodeUpdates'

import { AreaRedisRepository } from 'server/cache/repository/area'
import { ContextFactory } from 'server/controller/cycleData/tableData/updateDependencies/context'
import { persistResults } from 'server/controller/cycleData/tableData/updateDependencies/persistResults'
import { UpdateDependenciesJob } from 'server/controller/cycleData/tableData/updateDependencies/props'
import { updateCalculationDependencies } from 'server/controller/cycleData/tableData/updateDependencies/updateCalculationDependencies'
import { DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

const _getLogKey = (job: UpdateDependenciesJob): string => {
  const { assessment, cycle, nodeUpdates } = job.data

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const { countryIso } = nodeUpdates
  return `[updateDependencies-workerThread] [${[assessmentName, cycleName, countryIso].join('-')}] [job-${job.id}]`
}

type Returned = {
  externalDependants: Array<NodeUpdates>
  nodeUpdates: NodeUpdates
}

export default async (job: UpdateDependenciesJob): Promise<Returned> => {
  const logKey = _getLogKey(job)
  try {
    const { assessment, client = DB, cycle, nodeUpdates, user } = job.data
    const time = new Date().getTime()
    Logger.info(`${logKey} started with ${job.data.nodeUpdates.nodes.length} nodes.`)

    const { countryIso } = nodeUpdates
    const country = await AreaRedisRepository.getOneCountry({ assessment, cycle, countryIso }, client)

    const context = await ContextFactory.newInstance({ ...job.data, country })
    const result = updateCalculationDependencies({ context, jobId: job.id })
    await persistResults({ result, user }, client)

    const resultNodeUpdates = result.nodeUpdates
    const duration = (new Date().getTime() - time) / 1000
    Logger.info(`${logKey} ended in ${duration} seconds with ${resultNodeUpdates.nodes.length} updated nodes.`)

    return { nodeUpdates: resultNodeUpdates, externalDependants: context.externalDependants }
  } catch (error) {
    Logger.error(`${logKey} Error.`)
    Logger.error(error)
    return Promise.reject(error)
  }
}

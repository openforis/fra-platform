import { Job } from 'bullmq'

import { Logger } from 'server/utils/logger'

import { ContextFactory } from './context'
import { persistResults } from './persistResults'
import { UpdateDependenciesProps } from './props'
import { updateCalculationDependencies } from './updateCalculationDependencies'

const _getLogKey = (job: Job<UpdateDependenciesProps>): string => {
  const { assessment, cycle, countryIso } = job.data.nodeUpdates
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  return `[updateDependencies-workerThread] [${[assessmentName, cycleName, countryIso].join('-')}] [job-${job.id}]`
}

export default async (job: Job<UpdateDependenciesProps>) => {
  const logKey = _getLogKey(job)
  try {
    const time = new Date().getTime()
    Logger.info(`${logKey} started with ${job.data.nodeUpdates.nodes.length} nodes.`)

    const { nodeUpdates, isODP, user } = job.data
    const context = await ContextFactory.newInstance({ isODP, nodeUpdates })
    const result = updateCalculationDependencies({ context, jobId: job.id })
    await persistResults({ result, user })

    const duration = (new Date().getTime() - time) / 1000
    Logger.info(`${logKey} ended in ${duration} seconds with ${result.nodeUpdates.nodes.length} updated nodes.`)

    return Promise.resolve({ nodeUpdates: result.nodeUpdates })
  } catch (error) {
    Logger.error(`${logKey} Error.`)
    Logger.error(error)
    return Promise.reject(error)
  }
}

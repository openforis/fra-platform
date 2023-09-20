import { Job } from 'bullmq'

import { Logger } from 'server/utils/logger'

import { ContextFactory } from './context'
import { UpdateDependenciesProps } from './props'
import { updateCalculationDependencies } from './updateCalculationDependencies'

export default async (job: Job<UpdateDependenciesProps>) => {
  try {
    const time = new Date().getTime()
    Logger.info(
      `[updateDependenciesWorker] job-${job.id} in thread started. ${job.data.nodeUpdates.nodes.length} nodes.`
    )

    // const { nodeUpdates, isODP, sectionName, user } = job.data
    const { nodeUpdates, isODP } = job.data
    // const { assessment, cycle, countryIso, nodes } = nodeUpdates
    // const result: { nodeUpdates: NodeUpdates } = { nodeUpdates: { assessment, cycle, countryIso, nodes: [] } }

    const context = await ContextFactory.newInstance({ isODP, nodeUpdates })

    // await DB.tx(async (client) => {
    //   for (let i = 0; i < nodes.length; i += 1) {
    //     const node = nodes[i]
    //     const { colName, tableName, variableName } = node
    // eslint-disable-next-line no-await-in-loop
    // const updates = await updateCalculationDependencies(
    //   { assessment, colName, countryIso, cycle, isODP, sectionName, tableName, user, variableName },
    //
    // )

    const result = await updateCalculationDependencies({ context, jobId: job.id })
    // TODO: await persistResults()

    // if (updates.nodes) {
    //   result.nodeUpdates.nodes.push(...updates.nodes)
    // } else {
    //   Logger.error(
    //     `[updateDependenciesWorker] job-${
    //       job.id
    //     } Error STRANGE. item.nodeUpdates.nodes is undefined? item: ${JSON.stringify(
    //       updates
    //     )}. job data ${JSON.stringify(job.data)}`
    //   )
    // }
    // }
    // })

    Logger.info(
      `[updateDependenciesWorker] job-${job.id} in thread ended in ${(new Date().getTime() - time) / 1000} seconds.`
    )

    return Promise.resolve(result)
  } catch (error) {
    Logger.error(`[updateDependenciesWorker] job-${job.id} Error.`)
    Logger.error(error)
    return Promise.reject(error)
  }
}

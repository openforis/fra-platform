import { Job } from 'bullmq'

import { NodeUpdates } from '@meta/data'

import { DB } from '@server/db'
import { Logger } from '@server/utils/logger'

import { UpdateDependenciesProps } from './props'
import { updateNodeDependencies } from './updateNodeDependencies'

export default async (job: Job<UpdateDependenciesProps>) => {
  try {
    const time = new Date().getTime()
    Logger.debug(
      `[updateDependenciesWorker] job-${job.id} in thread started. ${job.data.nodeUpdates.nodes.length} nodes.`
    )

    const { nodeUpdates, isODP, sectionName, user } = job.data
    const { assessment, cycle, countryIso, nodes } = nodeUpdates
    const results: Array<{ nodeUpdates: NodeUpdates }> = []

    await DB.tx(async (client) => {
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i]
        const { colName, tableName, variableName } = node
        const sourceNode = isODP ? undefined : node
        // eslint-disable-next-line no-await-in-loop
        const result = await updateNodeDependencies(
          { assessment, colName, countryIso, cycle, isODP, sourceNode, sectionName, tableName, user, variableName },
          client
        )
        results.push(result)
      }
    })

    // const result = results.reduce<{ nodeUpdates: NodeUpdates; validations: NodeUpdates }>(
    const result = results.reduce<{ nodeUpdates: NodeUpdates }>(
      (acc, item) => {
        if (item?.nodeUpdates?.nodes) acc.nodeUpdates.nodes.push(...item.nodeUpdates.nodes)
        else
          Logger.error(
            `[updateDependenciesWorker] job-${
              job.id
            } Error STRANGE. item.nodeUpdates.nodes is undefined? item: ${JSON.stringify(
              item
            )}. job data ${JSON.stringify(job.data)}`
          )
        // acc.validations.nodes.push(...item.validations.nodes)
        return acc
      },
      {
        nodeUpdates: { assessment, cycle, countryIso, nodes: [] },
        // validations: { assessment, cycle, countryIso, nodes: [] },
      }
    )

    Logger.debug(
      `[updateDependenciesWorker] job-${job.id} in thread ended in ${(new Date().getTime() - time) / 1000} seconds.`
    )

    return Promise.resolve(result)
  } catch (error) {
    Logger.error(`[updateDependenciesWorker] job-${job.id} Error.`)
    Logger.error(error)
    return Promise.reject(error)
  }
}

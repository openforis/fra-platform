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
      `[updateDependenciesWorker] job in thread started ${job.id}. ${job.data.nodeUpdates.nodes.length} nodes.`
    )

    const { nodeUpdates, isODP, sectionName, user } = job.data
    const { assessment, cycle, countryIso, nodes } = nodeUpdates
    const results = await DB.tx(async (client) =>
      Promise.all(
        nodes.map((node) => {
          return updateNodeDependencies(
            {
              assessment,
              colName: node.colName,
              countryIso,
              cycle,
              isODP,
              sectionName,
              tableName: node.tableName,
              user,
              variableName: node.variableName,
            },
            client
          )
        })
      )
    )

    const result = results.reduce<{ nodeUpdates: NodeUpdates; validations: NodeUpdates }>(
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

    Logger.debug(
      `[updateDependenciesWorker] job in thread ended ${job.id} ${job.id} in ${
        (new Date().getTime() - time) / 1000
      } seconds. ${__dirname}`
    )

    return Promise.resolve(result)
  } catch (error) {
    Logger.error(`[updateDependenciesWorker] Error in job ${job.id}.`)
    Logger.error(error)
    return Promise.reject(error)
  }
}

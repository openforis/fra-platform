import { Job } from 'bullmq'

import { DB } from '@server/db'
import { Logger } from '@server/utils/logger'

import { calculateAndValidateDependentNodes } from '../calculateAndValidateDependentNodes'
import { DependantsUpdateProps } from '../props'

export default async (job: Job<DependantsUpdateProps>) => {
  const time = new Date().getTime()
  Logger.debug(
    `[updateDependenciesWorker] job in thread started ${job.id}. ${job.data.nodeUpdates.nodes.length} nodes.`
  )

  const { nodeUpdates, isODP, sectionName, user } = job.data
  const { assessment, cycle, countryIso, nodes } = nodeUpdates
  const result = await DB.tx(async (client) => {
    const results = await Promise.all(
      nodes.map((node) => {
        return calculateAndValidateDependentNodes(
          {
            assessment,
            colName: node.colName,
            countryIso,
            cycle,
            isODP,
            sourceNode: node,
            sectionName,
            tableName: node.tableName,
            user,
            variableName: node.variableName,
          },
          client
        )
      })
    )
    return results
  })

  Logger.debug(
    `[updateDependenciesWorker] job in thread ended ${job.id} ${job.id} in ${
      (new Date().getTime() - time) / 1000
    } seconds. ${__dirname}`
  )

  return Promise.resolve(result)
}

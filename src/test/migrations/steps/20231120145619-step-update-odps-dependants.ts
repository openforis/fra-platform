import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area'
import { AssessmentNames } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { getOriginalDataPointVariables } from 'server/controller/cycleData/originalDataPoint/getOriginalDataPointVariables'
import { ContextFactory } from 'server/controller/cycleData/updateDependencies/context'
import { updateCalculationDependencies } from 'server/controller/cycleData/updateDependencies/updateCalculationDependencies'
import { BaseProtocol } from 'server/db'
import { NodeDb, NodeRepository } from 'server/repository/assessmentCycle/node'
import { DataRedisRepository } from 'server/repository/redis/data'
import { Logger } from 'server/utils/logger'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025', metaCache: true },
    client
  )
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const countries = await AreaController.getCountries({ assessment, cycle }, client)
  const originalDataPointVariables = getOriginalDataPointVariables({ cycle })

  const allNodesDb: Array<NodeDb> = []
  const allNodes: Array<{ nodes: Record<string, NodeUpdate[]>; countryIso: CountryIso }> = []

  await Promises.each(countries, async ({ countryIso }) => {
    const originalDataPoints = await CycleDataController.getOriginalDataPoints(
      { assessment, cycle, countryIso },
      client
    )

    const nodeUpdateArray: Array<NodeUpdate> = []
    originalDataPoints.forEach((originalDataPoint) => {
      const colName = String(originalDataPoint.year)
      const opdNodes = originalDataPointVariables.map<NodeUpdate>(({ tableName, variableName }) => {
        return { tableName, variableName, colName, value: undefined }
      })
      nodeUpdateArray.push(...opdNodes)
    })

    const nodeUpdates: NodeUpdates = { assessmentName, cycleName, countryIso, nodes: nodeUpdateArray }
    const contextProps = { assessment, cycle, isODP: true, nodeUpdates }
    const context = await ContextFactory.newInstance(contextProps, client)
    const { nodesDb, nodes } = updateCalculationDependencies({ context, jobId: `migration_step-${Date.now()}` })

    if (nodesDb.length > 0) {
      allNodesDb.push(...nodesDb)
      allNodes.push({ nodes, countryIso })
    }
  })

  try {
    if (allNodesDb.length > 0) {
      await NodeRepository.massiveInsert({ assessment, cycle, nodes: allNodesDb }, client)
      await Promise.all(
        allNodes.map(async ({ countryIso, nodes }) => {
          await DataRedisRepository.updateNodes({ assessment, cycle, countryIso, nodes })
        })
      )
    }
  } catch (e) {
    Logger.error('Persisting nodes failed')
    Logger.error(e)
  }
}

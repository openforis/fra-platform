import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { AreaController } from 'server/controller/area'
import { CycleDataController } from 'server/controller/cycleData'
import { getOriginalDataPointVariables } from 'server/controller/cycleData/originalDataPoint/getOriginalDataPointVariables'
import { ContextFactory } from 'server/controller/cycleData/updateDependencies/context'
import { updateCalculationDependencies } from 'server/controller/cycleData/updateDependencies/updateCalculationDependencies'
import { BaseProtocol, DB } from 'server/db'
import { NodeDb, NodeRepository } from 'server/repository/assessmentCycle/node'
import { DataRedisRepository } from 'server/repository/redis/data'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const updateODPDependencies = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle } = props
  const countryISOs = (await AreaController.getCountries({ assessment, cycle }, client)).map((c) => c.countryIso)
  const originalDataPointVariables = getOriginalDataPointVariables({ cycle })

  // eslint-disable-next-line no-await-in-loop
  await Promises.each(countryISOs, async (countryIso) => {
    const allNodesDb: Array<NodeDb> = []
    const allNodes: Array<{ nodes: Record<string, NodeUpdate[]>; countryIso: CountryIso }> = []

    const getOriginalDataPointsProps = { assessment, cycle, countryIso }
    const originalDataPoints = await CycleDataController.getOriginalDataPoints(getOriginalDataPointsProps, client)

    if (originalDataPoints.length === 0) return

    const nodes: Array<NodeUpdate> = originalDataPoints.reduce((acc, originalDataPoint) => {
      const colName = String(originalDataPoint.year)
      const opdNodes = originalDataPointVariables.map<NodeUpdate>(({ tableName, variableName }) => {
        return { tableName, variableName, colName, value: undefined }
      })
      acc.push(...opdNodes)
      return acc
    }, [])

    const assessmentName = assessment.props.name
    const cycleName = cycle.name

    const nodeUpdates: NodeUpdates = { assessmentName, cycleName, countryIso, nodes }
    const contextProps = { assessment, cycle, isODP: true, nodeUpdates, includeSourceNodes: true }
    const context = await ContextFactory.newInstance(contextProps, client)
    const result = updateCalculationDependencies({ context, jobId: `migration_step-${Date.now()}` })

    if (result.nodesDb.length > 0) {
      allNodesDb.push(...result.nodesDb)
      allNodes.push({ nodes: result.nodes, countryIso })
    }

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
  })
}

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, RowCaches } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { AreaController } from 'server/controller/area'
import { ContextFactory } from 'server/controller/cycleData/updateDependencies/context'
import { updateCalculationDependencies } from 'server/controller/cycleData/updateDependencies/updateCalculationDependencies'
import { BaseProtocol } from 'server/db'
import { NodeDb, NodeRepository } from 'server/repository/assessmentCycle/node'
import { DataRedisRepository } from 'server/repository/redis/data'
import { RowRedisRepository } from 'server/repository/redis/row'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycle: Cycle
  variableName: string
  tableName: string
}

const _updateCache = async (props: { assessment: Assessment; tableName: string; variableName: string }) => {
  const { assessment, variableName, tableName } = props

  await RowRedisRepository.getRows({
    assessment,
    rowKeys: [RowCaches.getKey({ tableName, variableName })],
    force: true,
  })
}

export const updateCalculatedVariable = async (props: Props, client: BaseProtocol) => {
  const { assessment, cycle, variableName, tableName } = props

  await _updateCache({ assessment, variableName, tableName })

  const _nodes: Array<NodeUpdate> = [{ tableName, variableName } as NodeUpdate]

  const countryISOs = (await AreaController.getCountries({ assessment, cycle }, client)).map((c) => c.countryIso)

  const allNodesDb: Array<NodeDb> = []
  const allNodes: Array<{
    nodes: Record<string, NodeUpdate[]>
    countryIso: CountryIso
  }> = []

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const assessmentName = assessment.props.name
      const cycleName = cycle.name

      const nodeUpdates: NodeUpdates = { assessmentName, cycleName, countryIso, nodes: _nodes }
      const contextProps = { assessment, cycle, isODP: false, nodeUpdates, includeSourceNodes: true }
      const context = await ContextFactory.newInstance(contextProps)
      const { nodesDb, nodes } = updateCalculationDependencies({ context, jobId: `migration_step-${Date.now()}` })

      allNodesDb.push(...nodesDb)
      allNodes.push({
        nodes,
        countryIso,
      })
    })
  )

  try {
    await NodeRepository.massiveInsert({ assessment, cycle, nodes: allNodesDb }, client)
    await Promise.all(
      allNodes.map(async ({ countryIso, nodes }) => {
        await DataRedisRepository.updateNodes({ assessment, cycle, countryIso, nodes })
      })
    )
  } catch (e) {
    Logger.error('Persisting nodes failed')
    Logger.error(e)
  }
}

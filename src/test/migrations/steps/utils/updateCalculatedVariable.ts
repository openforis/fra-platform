import { Assessment, Cycle } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { AreaController } from 'server/controller/area'
import { ContextFactory } from 'server/controller/cycleData/updateDependencies/context'
import { updateCalculationDependencies } from 'server/controller/cycleData/updateDependencies/updateCalculationDependencies'
import { BaseProtocol } from 'server/db'
import { RowRepository } from 'server/repository/assessment/row'
import { NodeDb, NodeRepository } from 'server/repository/assessmentCycle/node'
import { DataRedisRepository } from 'server/repository/redis/data'
import { RowRedisRepository } from 'server/repository/redis/row'

type Props = {
  assessment: Assessment
  cycle: Cycle
  variableName: string
  tableName: string
}

const _updateCache = async (props: { assessment: Assessment; tableName: string; variableName: string }) => {
  const { assessment, variableName, tableName } = props

  const rowCache = await RowRepository.getOneCache({
    assessment,
    tableName,
    variableName,
  })

  await RowRedisRepository.updateRow({
    assessment,
    rowCache,
    tableName,
    variableName,
  })
}

export const updateCalculatedVariable = async (props: Props, client: BaseProtocol) => {
  const { assessment, cycle, variableName, tableName } = props

  await _updateCache({ assessment, variableName, tableName })

  const _nodes: Array<NodeUpdate> = [{ tableName, variableName } as NodeUpdate]

  const countryISOs = (await AreaController.getCountries({ assessment, cycle }, client)).map((c) => c.countryIso)

  const allNodesDb: Array<NodeDb> = []

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const assessmentName = assessment.props.name
      const cycleName = cycle.name

      const nodeUpdates: NodeUpdates = { assessmentName, cycleName, countryIso, nodes: _nodes }
      const contextProps = { assessment, cycle, isODP: false, nodeUpdates, includeSourceNodes: true }
      const context = await ContextFactory.newInstance(contextProps)
      const { nodesDb, nodes } = updateCalculationDependencies({ context, jobId: `migration_step-${Date.now()}` })

      allNodesDb.push(...nodesDb)

      await DataRedisRepository.updateNodes({ assessment, cycle, countryIso, nodes })
    })
  )

  await NodeRepository.massiveInsert({ assessment, cycle, nodes: allNodesDb }, client)
}

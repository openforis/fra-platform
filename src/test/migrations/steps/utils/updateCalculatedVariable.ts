import { CountryIso } from 'meta/area'
import { Assessment, Cycle, RowCaches } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { AreaController } from 'server/controller/area'
import { ContextFactory } from 'server/controller/cycleData/updateDependencies/context'
import { updateCalculationDependencies } from 'server/controller/cycleData/updateDependencies/updateCalculationDependencies'
import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol } from 'server/db'
import { NodeDb, NodeRepository } from 'server/repository/assessmentCycle/node'
import { DataRedisRepository } from 'server/repository/redis/data'
import { RowRedisRepository } from 'server/repository/redis/row'
import { SectionRedisRepository } from 'server/repository/redis/section'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycle: Cycle
  sectionName: string
  tableName: string
  variableName: string
}

const _updateCache = async (props: Props) => {
  const { assessment, cycle, sectionName, tableName, variableName } = props

  const force = true
  const sectionNames = [sectionName]
  const rowKeys = [RowCaches.getKey({ tableName, variableName })]

  await Promise.all([
    SectionRedisRepository.getManyMetadata({ assessment, cycle, sectionNames, force }),
    RowRedisRepository.getRows({ assessment, rowKeys, force }),
  ])
}

/**
 * @deprecated
 */
export const updateCalculatedVariable = async (props: Props, client: BaseProtocol) => {
  const { assessment, cycle, sectionName, variableName, tableName } = props

  await _updateCache({ assessment, cycle, sectionName, variableName, tableName })

  const table = await MetadataController.getTable({ assessment, cycle, tableName }, client)

  const _nodes = table.props.columnNames?.[cycle.uuid].map<NodeUpdate>((colName) => {
    return { tableName, variableName, colName, value: undefined }
  })

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
      const context = await ContextFactory.newInstance(contextProps, client)
      const { nodesDb, nodes } = updateCalculationDependencies({ context, jobId: `migration_step-${Date.now()}` })

      if (nodesDb.length > 0) {
        allNodesDb.push(...nodesDb)
        allNodes.push({ nodes, countryIso })
      }
    })
  )

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

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { AreaController } from 'server/controller/area'
import { ContextFactory } from 'server/controller/cycleData/updateDependencies/context'
import { updateCalculationDependencies } from 'server/controller/cycleData/updateDependencies/updateCalculationDependencies'
import { BaseProtocol, DB } from 'server/db'
import { NodeDb, NodeRepository } from 'server/repository/assessmentCycle/node'
import { DataRedisRepository } from 'server/repository/redis/data'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycle: Cycle
  nodes: Array<NodeUpdate>
  isODP?: boolean
}

export const updateDependencies = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, nodes, isODP } = props

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

      const nodeUpdates: NodeUpdates = { assessmentName, cycleName, countryIso, nodes }
      const contextProps = { assessment, cycle, isODP, nodeUpdates, includeSourceNodes: true }
      const context = await ContextFactory.newInstance(contextProps, client)
      const result = updateCalculationDependencies({ context, jobId: `migration_step-${Date.now()}` })

      if (result.nodesDb.length > 0) {
        allNodesDb.push(...result.nodesDb)
        allNodes.push({ nodes: result.nodes, countryIso })
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

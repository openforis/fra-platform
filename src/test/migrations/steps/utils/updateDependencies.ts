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
  includeSourceNodes?: boolean
  isODP?: boolean
} & (
  | {
      nodes: Array<NodeUpdate>
    }
  | {
      countryNodes: { [key in CountryIso]?: Array<NodeUpdate> }
    }
)

export const updateDependencies = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, includeSourceNodes, isODP } = props
  const allNodesDb: Array<NodeDb> = []
  const allNodes: Array<{ nodes: Record<string, NodeUpdate[]>; countryIso: CountryIso }> = []

  const _execJob = async (props: { countryIso: CountryIso; nodes: Array<NodeUpdate> }): Promise<void> => {
    const { countryIso, nodes } = props
    const assessmentName = assessment.props.name
    const cycleName = cycle.name

    const nodeUpdates: NodeUpdates = { assessmentName, cycleName, countryIso, nodes }
    const contextProps = { assessment, cycle, isODP, nodeUpdates, includeSourceNodes }
    const context = await ContextFactory.newInstance(contextProps, client)
    const result = updateCalculationDependencies({ context, jobId: `migration_step-${Date.now()}` })

    if (result.nodesDb.length > 0) {
      allNodesDb.push(...result.nodesDb)
      allNodes.push({ nodes: result.nodes, countryIso })
    }
  }

  if ('countryNodes' in props) {
    await Promise.all(
      Object.entries(props.countryNodes).map(([countryIso, nodes]: [CountryIso, Array<NodeUpdate>]) =>
        _execJob({ countryIso, nodes })
      )
    )
  }

  if ('nodes' in props) {
    const { nodes } = props
    const countryISOs = (await AreaController.getCountries({ assessment, cycle }, client)).map((c) => c.countryIso)
    await Promise.all(countryISOs.map((countryIso) => _execJob({ countryIso, nodes })))
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
}

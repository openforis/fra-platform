import { Assessment, Cycle } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { AreaController } from 'server/controller/area'
import { ContextFactory } from 'server/controller/cycleData/updateDependencies/context'
import { updateCalculationDependencies } from 'server/controller/cycleData/updateDependencies/updateCalculationDependencies'
import { BaseProtocol } from 'server/db'
import { NodeRepository } from 'server/repository/assessmentCycle/node'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
  variableName: string
  tableName: string
}

export const updateCalculatedVariable = async (props: Props, client: BaseProtocol) => {
  const { assessment, cycle, variableName, tableName } = props

  // -- flush redis
  await RedisData.getInstance().flushall()

  const nodes: Array<NodeUpdate> = [{ tableName, variableName } as NodeUpdate]

  const countryISOs = (await AreaController.getCountries({ assessment, cycle }, client)).map((c) => c.countryIso)

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const assessmentName = assessment.props.name
      const cycleName = cycle.name

      const nodeUpdates: NodeUpdates = { assessmentName, cycleName, countryIso, nodes }
      const contextProps = { assessment, cycle, isODP: false, nodeUpdates, includeSourceNodes: true }
      const context = await ContextFactory.newInstance(contextProps)
      const { nodesDb } = updateCalculationDependencies({ context, jobId: `migration_step-${Date.now()}` })

      await NodeRepository.massiveInsert({ assessment, cycle, nodes: nodesDb }, client)
    })
  )
}

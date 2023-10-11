import { Assessment, Cycle, RowCaches } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { AreaController } from 'server/controller/area'
import { ContextFactory } from 'server/controller/cycleData/updateDependencies/context'
import { updateCalculationDependencies } from 'server/controller/cycleData/updateDependencies/updateCalculationDependencies'
import { BaseProtocol } from 'server/db'
import { RowRepository } from 'server/repository/assessment/row'
import { NodeRepository } from 'server/repository/assessmentCycle/node'
import { DataRedisRepository } from 'server/repository/redis/data'
import { getKeyRow } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
  variableName: string
  tableName: string
}

const _updateCache = async (props: { assessment: Assessment; tableName: string; variableName: string }) => {
  const { assessment, variableName, tableName } = props
  const redis = RedisData.getInstance()
  const key = getKeyRow({ assessment })
  const rowKey = RowCaches.getKey({
    tableName,
    variableName,
  })

  const r = (await RowRepository.getManyCache({ assessment })).find(
    (r) => r.tableName === tableName && r.props.variableName === variableName
  )

  await redis.hset(key, rowKey, JSON.stringify(r))
}

export const updateCalculatedVariable = async (props: Props, client: BaseProtocol) => {
  const { assessment, cycle, variableName, tableName } = props

  await _updateCache({ assessment, variableName, tableName })

  const _nodes: Array<NodeUpdate> = [{ tableName, variableName } as NodeUpdate]

  const countryISOs = (await AreaController.getCountries({ assessment, cycle }, client)).map((c) => c.countryIso)

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const assessmentName = assessment.props.name
      const cycleName = cycle.name

      const nodeUpdates: NodeUpdates = { assessmentName, cycleName, countryIso, nodes: _nodes }
      const contextProps = { assessment, cycle, isODP: false, nodeUpdates, includeSourceNodes: true }
      const context = await ContextFactory.newInstance(contextProps)
      const { nodesDb, nodes } = updateCalculationDependencies({ context, jobId: `migration_step-${Date.now()}` })

      await NodeRepository.massiveInsert({ assessment, cycle, nodes: nodesDb }, client)

      await DataRedisRepository.updateNodes({ assessment, cycle, countryIso, nodes })
    })
  )
}

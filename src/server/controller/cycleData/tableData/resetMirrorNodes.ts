import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { NodeValue } from 'meta/assessment/node'
import { NodeUpdate, NodeUpdates } from 'meta/data/nodeUpdates'
import { Promises } from 'utils/promises'

import { DataRedisRepository } from 'server/cache/repository/data'
import { BaseProtocol } from 'server/db/db'
import { NodeRepository } from 'server/db/repository/assessmentCycle/node'

type Props = {
  assessment: Assessment
  cycle: Cycle
  nodeUpdates: NodeUpdates
}

export const resetMirrorNodes = async (props: Props, client: BaseProtocol): Promise<NodeUpdates> => {
  const { assessment, cycle, nodeUpdates } = props
  const { countryIso, nodes } = nodeUpdates
  const nodeUpdatesResult: NodeUpdates = { ...nodeUpdates, nodes: [...nodeUpdates.nodes] }

  await Promises.each(nodes, async (node) => {
    const { colName, tableName, variableName } = node
    const propsMirror = { assessment, cycle, tableName, variableName }
    const mirrorDependency = AssessmentMetaCaches.getCalculationMirrorVariable(propsMirror)

    if (mirrorDependency) {
      const value: NodeValue = { raw: null, calculated: true }
      const nodeUpdateMirror: NodeUpdate = {
        tableName: mirrorDependency.tableName,
        variableName: mirrorDependency.variableName,
        colName,
        value,
      }
      const propsUpdate = { assessment, cycle, countryIso }
      await Promise.all([
        NodeRepository.remove({ ...propsUpdate, ...nodeUpdateMirror }, client),
        DataRedisRepository.removeNodes({
          ...propsUpdate,
          nodes: { [mirrorDependency.tableName]: [nodeUpdateMirror] },
        }),
      ])
      nodeUpdatesResult.nodes.push(nodeUpdateMirror)
    }
    return Promise.resolve()
  })

  return nodeUpdatesResult
}

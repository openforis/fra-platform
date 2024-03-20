import { Promises } from 'utils/promises'

import { Assessment, AssessmentMetaCaches, Cycle, NodeValue } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { BaseProtocol } from 'server/db'
import { NodeRepository } from 'server/repository/assessmentCycle/node'
import { DataRedisRepository } from 'server/repository/redis/data'

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
    const { tableName, variableName, colName } = node
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

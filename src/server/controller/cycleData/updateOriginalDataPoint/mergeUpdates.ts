import { NodeUpdates } from '@meta/data'

import { nodeExists } from '@server/controller/cycleData/updateOriginalDataPoint/nodeExists'

export const mergeUpdates = (nodeUpdatesA: NodeUpdates, nodeUpdatesB: NodeUpdates) => {
  nodeUpdatesB.nodes.forEach((nodeB) => {
    if (!nodeExists(nodeB, nodeUpdatesA.nodes)) {
      nodeUpdatesA.nodes.push(nodeB)
    }
  })
  return nodeUpdatesA
}

import { NodeUpdate, NodeUpdates } from '@meta/data'

import { BaseProtocol } from '@server/db'

import { PersistNodeValueProps } from '../persistNodeValues/props'
import { updateCalculationDependencies } from './updateCalculationDependencies'
import { updateValidationDependencies } from './updateValidationDependencies'

export const updateNodeDependencies = async (
  props: Omit<PersistNodeValueProps, 'value'> & { sourceNode?: NodeUpdate; isODP?: boolean },
  client: BaseProtocol
): Promise<{ nodeUpdates: NodeUpdates; validations: NodeUpdates }> => {
  const { isODP, sourceNode } = props

  const nodeUpdates = await updateCalculationDependencies(props, client)
  if (sourceNode) nodeUpdates.nodes.unshift(sourceNode)

  const validations = await updateValidationDependencies({ nodeUpdates, isODP }, client)

  return { nodeUpdates, validations }
}

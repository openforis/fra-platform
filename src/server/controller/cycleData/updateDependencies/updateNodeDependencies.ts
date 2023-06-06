import { NodeUpdate, NodeUpdates } from 'meta/data'

import { BaseProtocol } from 'server/db'

import { PersistNodeValueProps } from '../persistNodeValues/props'
import { updateCalculationDependencies } from './updateCalculationDependencies'

export const updateNodeDependencies = async (
  props: Omit<PersistNodeValueProps, 'value'> & { sourceNode?: NodeUpdate; isODP?: boolean },
  client: BaseProtocol
  // ): Promise<{ nodeUpdates: NodeUpdates; validations: NodeUpdates }> => {
): Promise<{ nodeUpdates: NodeUpdates }> => {
  // const { isODP, sourceNode } = props
  const { sourceNode } = props

  const nodeUpdates = await updateCalculationDependencies(props, client)
  if (sourceNode) nodeUpdates.nodes.unshift(sourceNode)

  // const validations = await updateValidationDependencies({ nodeUpdates, isODP }, client)

  // return { nodeUpdates, validations }
  return { nodeUpdates }
}

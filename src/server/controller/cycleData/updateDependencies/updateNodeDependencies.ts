import { NodeUpdates } from '@meta/data'

import { BaseProtocol } from '@server/db'

import { PersistNodeValueProps } from '../persistNodeValues/props'
import { updateCalculationDependencies } from './updateCalculationDependencies'
import { updateValidationDependencies } from './updateValidationDependencies'

export const updateNodeDependencies = async (
  props: Omit<PersistNodeValueProps, 'value'> & { isODP?: boolean },
  client: BaseProtocol
): Promise<{ nodeUpdates: NodeUpdates; validations: NodeUpdates }> => {
  const { isODP } = props

  const nodeUpdates = await updateCalculationDependencies(props, client)

  const validations = await updateValidationDependencies({ nodeUpdates, isODP }, client)

  return { nodeUpdates, validations }
}

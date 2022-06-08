import { NodeValueValidation, NodeValueValidationMessage } from '@meta/assessment/nodeValueValidation'

const merge = (nodeValueValidations: Array<NodeValueValidation>): NodeValueValidation => {
  const valid = nodeValueValidations.every(({ valid }) => valid)
  const messages = nodeValueValidations.reduce<Array<NodeValueValidationMessage>>(
    (messagesAcc, { messages = [] }) => [...messagesAcc, ...messages],
    []
  )

  return { valid, messages }
}

export const NodeValueValidations = {
  merge,
}

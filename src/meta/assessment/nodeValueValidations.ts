import { NodeValue } from 'meta/assessment/node'
import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'

const merge = (nodeValueValidations: Array<NodeValueValidation>): NodeValueValidation => {
  const valid = nodeValueValidations.every(({ valid }) => valid)
  const messages = nodeValueValidations.reduce<Array<NodeValueValidationMessage>>(
    (messagesAcc, { messages = [] }) => [...messagesAcc, ...messages],
    []
  )

  return { valid, messages }
}

const isValid = (nodeValue: NodeValue): boolean => nodeValue?.validation?.valid !== false

export const NodeValueValidations = {
  merge,
  isValid,
}

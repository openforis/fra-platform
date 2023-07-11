import { Objects } from 'utils/objects'

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

const equals = (validationA: NodeValueValidation, validationB: NodeValueValidation): boolean => {
  // valid different
  if (validationA.valid !== validationB.valid) return false
  // both valid
  if (validationA.valid && validationB.valid) return true
  // both invalid
  if (validationA.messages?.length !== validationB.messages?.length) return false

  return !validationA.messages.some((messageA, index) => {
    const messageB = validationB.messages[index]
    if (messageA.key !== messageB.key) return true
    return Objects.isEqual(messageA.params, messageB.params)
  })
}

export const NodeValueValidations = {
  equals,
  merge,
  isValid,
}

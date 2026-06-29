import { TFunction } from 'i18next'

import { Validation } from 'meta/assessment/validation/validation'
import { Objects } from 'utils/objects'

import { getMessage } from './getMessage'

export const getMessages = (t: TFunction, validation?: Validation): Array<string> => {
  const { messages = [], valid } = validation ?? {}

  if (valid || Objects.isEmpty(messages)) return []

  return messages.map<string>((message) => getMessage(t, message))
}

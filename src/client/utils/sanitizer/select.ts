import { Objects } from 'utils/objects'

import { ColSelectOption } from 'meta/assessment'

import { Value } from 'client/utils/sanitizer/_types'

export const acceptNextSelectOption = (
  newValue: Value,
  currentValue: Value,
  options?: Array<ColSelectOption>
): Value => {
  const newValueArray = Array.isArray(newValue) ? newValue : [newValue]
  const valid =
    Objects.isNil(newValue) || newValueArray.every((value) => Boolean(options.find((option) => option.name === value)))

  if (valid) {
    return newValue
  }

  return currentValue
}

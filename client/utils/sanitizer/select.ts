import { ColSelectOption } from '@meta/assessment'

export const acceptNextSelectOption = (newValue: string, currentValue: string, options?: Array<ColSelectOption>) => {
  const valid = Boolean(options?.find((option) => option.name === newValue))
  if (valid) {
    return newValue
  }
  return currentValue
}

import { Objects } from 'utils/objects'

import { ColSelectOption } from 'meta/assessment'

export const acceptNextSelectOption = (props: {
  options?: Array<ColSelectOption>
  value: string
  valuePrev: string
}) => {
  const { options, value, valuePrev } = props

  const valid = Objects.isNil(value) || Boolean(options.find((option) => option.name === value))

  if (valid) {
    return value
  }

  return valuePrev
}

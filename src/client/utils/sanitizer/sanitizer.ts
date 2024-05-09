import { ColSelectOption, ColType } from 'meta/assessment'

import { acceptableAsDecimal, acceptNextDecimal } from './decimal'
import { acceptableAsInteger, acceptNextInteger } from './integer'
import { acceptNextSelectOption } from './select'

const sanitizerFnByType: Record<
  string,
  (props: {
    value: string | number
    valuePrev: string | number
    precision?: number
    options?: Array<ColSelectOption>
  }) => string
> = {
  [ColType.decimal]: acceptNextDecimal,
  [ColType.integer]: acceptNextInteger,
  [ColType.select]: acceptNextSelectOption,
}

const acceptableFnByType: Record<string, (value: string | number) => boolean> = {
  [ColType.decimal]: acceptableAsDecimal,
  [ColType.integer]: acceptableAsInteger,
}

const isAcceptable = (props: { type: ColType; value: string }): boolean => {
  const { type, value } = props
  const acceptableFn = acceptableFnByType[type]
  if (acceptableFn) {
    return acceptableFn(value)
  }
  return true
}

export const sanitize = (props: {
  value: string
  type: ColType
  valuePrev: string
  options?: Array<ColSelectOption>
}): string => {
  const { type, value, valuePrev, options } = props
  const sanitizerFn = sanitizerFnByType[type]
  if (sanitizerFn) {
    return sanitizerFn({ value, valuePrev, options })
  }
  return value
}

export const Sanitizer = {
  acceptableAsDecimal,
  acceptableAsInteger,
  acceptNextDecimal,
  acceptNextInteger,
  isAcceptable,
  sanitize,
}

import { ColSelectOption, ColType } from 'meta/assessment'

import { acceptableAsDecimal, acceptNextDecimal } from './decimal'
import { acceptableAsInteger, acceptNextInteger } from './integer'
import { acceptNextSelectOption } from './select'

const sanitizerFnByType: Record<
  string,
  (value: string, valuePrev: string, options?: Array<ColSelectOption>, precision?: number) => string
> = {
  [ColType.decimal]: (value, valuePrev, _options, precision) => acceptNextDecimal(value, valuePrev, precision),
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
  options?: Array<ColSelectOption>
  precision?: number
  type: ColType
  value: string
  valuePrev: string
}): string => {
  const { options, precision, type, value, valuePrev } = props
  const sanitizerFn = sanitizerFnByType[type]
  if (sanitizerFn) {
    return sanitizerFn(value, valuePrev, options, precision)
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

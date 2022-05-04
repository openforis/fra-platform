// import { ColOption, ColType } from '@meta/assessment'
import { ColType } from '@meta/assessment'

import { acceptableAsDecimal, acceptNextDecimal } from './decimal'
import { acceptableAsInteger, acceptNextInteger } from './integer'

const sanitizerFnByType: Record<
  string,
  // (value: string | number, valuePrev: string | number, options?: Array<ColOption>) => string
  (value: string | number, valuePrev: string | number) => string
> = {
  [ColType.decimal]: acceptNextDecimal,
  [ColType.integer]: acceptNextInteger,
  // [ColType.select]: sanitizerSelectValue,
}

const acceptableFnByType: Record<string, (value: string | number) => boolean> = {
  [ColType.decimal]: acceptableAsDecimal,
  [ColType.integer]: acceptableAsInteger,
}

// const sanitizerSelectValue = (value: string, valuePrev: string, options?: Array<ColOption>): string => {
//   const valid = Boolean(options.find((option) => option.optionName === value))
//   if (valid) {
//     return value
//   }
//   return valuePrev
// }

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
  // options?: Array<ColOption>
}): string => {
  // const { options, type, value, valuePrev } = props
  const { type, value, valuePrev } = props
  const sanitizerFn = sanitizerFnByType[type]
  if (sanitizerFn) {
    // return sanitizerFn(value, valuePrev, options)
    return sanitizerFn(value, valuePrev)
  }
  return value
}

// TODO Implement Sanitizer.sanitize

export const Sanitizer = {
  acceptableAsDecimal,
  acceptableAsInteger,
  acceptNextDecimal,
  acceptNextInteger,
  isAcceptable,
  sanitize,
}

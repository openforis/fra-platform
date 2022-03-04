import {
  acceptNextDecimal,
  acceptableAsDecimal,
  acceptNextInteger,
  acceptableAsInteger,
} from '@webapp/utils/numberInput'
import { ColOptionSpec, TypeSpec } from '@webapp/sectionSpec'

const sanitizerSelectValue = (value: string, valuePrev: string, options?: Array<ColOptionSpec>): string => {
  const valid = Boolean(options.find((option) => option.optionName === value))
  if (valid) {
    return value
  }
  return valuePrev
}

const acceptableFnByType: Record<string, (value: string | number) => boolean> = {
  [TypeSpec.decimal]: acceptableAsDecimal,
  [TypeSpec.integer]: acceptableAsInteger,
}

const sanitizerFnByType: Record<
  string,
  (value: string | number, valuePrev: string | number, options?: Array<ColOptionSpec>) => string
> = {
  [TypeSpec.decimal]: acceptNextDecimal,
  [TypeSpec.integer]: acceptNextInteger,
  [TypeSpec.select]: sanitizerSelectValue,
}

export const isAcceptable = (type: TypeSpec, value: string): boolean => {
  const acceptableFn = acceptableFnByType[type]
  if (acceptableFn) {
    return acceptableFn(value)
  }
  return true
}

export const sanitize = (type: TypeSpec, value: string, valuePrev: string, options?: Array<ColOptionSpec>): string => {
  const sanitizerFn = sanitizerFnByType[type]
  if (sanitizerFn) {
    return sanitizerFn(value, valuePrev, options)
  }
  return value
}

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import {
  acceptNextDecimal,
  acceptableAsDecimal,
  acceptNextInteger,
  acceptableAsInteger,
} from '@webapp/utils/numberInput'

const sanitizerSelectValue = (value: any, valuePrev: any, options: any) => {
  const valid = Boolean(options.find((option: any) => option[SectionSpec.KEYS_COL.optionName] === value))
  if (valid) {
    return value
  }
  return valuePrev
}

const acceptableFnByType = {
  [SectionSpec.TypeSpec.decimal]: acceptableAsDecimal,
  [SectionSpec.TypeSpec.integer]: acceptableAsInteger,
}

const sanitizerFnByType = {
  [SectionSpec.TypeSpec.decimal]: acceptNextDecimal,
  [SectionSpec.TypeSpec.integer]: acceptNextInteger,
  [SectionSpec.TypeSpec.select]: sanitizerSelectValue,
}

export const isAcceptable = (type: any, value: any) => {
  const acceptableFn = acceptableFnByType[type]
  if (acceptableFn) {
    return acceptableFn(value)
  }
  return true
}

export const sanitize = (type: any, value: any, valuePrev: any, options?: any) => {
  const sanitizerFn = sanitizerFnByType[type]
  if (sanitizerFn) {
    return sanitizerFn(value, valuePrev, options)
  }
  return value
}

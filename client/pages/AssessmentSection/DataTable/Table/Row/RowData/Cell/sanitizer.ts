// import {
//   acceptNextDecimal,
//   acceptableAsDecimal,
//   acceptNextInteger,
//   acceptableAsInteger,
// } from '@client/utils/numberInput'

// import { ColOption, ColType } from '@meta/assessment'

// const sanitizerSelectValue = (value: string, valuePrev: string, options?: Array<ColOption>): string => {
//   const valid = Boolean(options.find((option) => option.optionName === value))
//   if (valid) {
//     return value
//   }
//   return valuePrev
// }

// const acceptableFnByType: Record<string, (value: string | number) => boolean> = {
//   [ColType.decimal]: acceptableAsDecimal,
//   [ColType.integer]: acceptableAsInteger,
// }

// const sanitizerFnByType: Record<
//   string,
//   (value: string | number, valuePrev: string | number, options?: Array<ColOption>) => string
// > = {
//   [ColType.decimal]: acceptNextDecimal,
//   [ColType.integer]: acceptNextInteger,
//   [ColType.select]: sanitizerSelectValue,
// }

// export const isAcceptable = (type: ColType, value: string): boolean => {
//   const acceptableFn = acceptableFnByType[type]
//   if (acceptableFn) {
//     return acceptableFn(value)
//   }
//   return true
// }

// export const sanitize = (type: ColType, value: string, valuePrev: string, options?: Array<ColOption>): string => {
//   const sanitizerFn = sanitizerFnByType[type]
//   if (sanitizerFn) {
//     return sanitizerFn(value, valuePrev, options)
//   }
//   return value
// }

// TODO Implement Sanitizer.sanitize

export const Sanitizer = {
  sanitize: (props: { value: string }): string => props.value,
}

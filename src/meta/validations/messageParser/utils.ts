import { TFunction } from 'i18next'

import { ValidationMessageParam } from 'meta/assessment/validation/validation'
import { Objects } from 'utils/objects'

// Only params wrapped in { key } are translated. The rest is user data (URLs, names, numbers)
// that t(...) would corrupt: i18next treats ":" as a namespace separator,
// e.g t("https://link.com") -> "//link.com"
export const translateParam = (t: TFunction, param: ValidationMessageParam): string => {
  if (Array.isArray(param)) {
    return `(${param.map<string>((item) => translateParam(t, item)).join(', ')})`
  }

  const isTranslationKey = !Objects.isNil(param) && typeof param === 'object'
  if (isTranslationKey) {
    return t(param.key)
  }

  return String(param)
}

export const translateParams = (
  t: TFunction,
  params?: Record<string, ValidationMessageParam>
): Record<string, string> | undefined => {
  if (Objects.isEmpty(params)) {
    return undefined
  }

  return Object.fromEntries(Object.entries(params).map(([key, value]) => [key, translateParam(t, value)]))
}

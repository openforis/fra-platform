import { TFunction } from 'i18next'

import { NodeValueValidationMessageParam } from 'meta/assessment/nodeValueValidation'
import { Objects } from 'utils/objects'

export const translateParam = (t: TFunction, param: NodeValueValidationMessageParam): string => {
  if (Array.isArray(param)) {
    return `(${param.map((item) => translateParam(t, item)).join(', ')})`
  }

  return t(String(param))
}

export const translateParams = (
  t: TFunction,
  params?: Record<string, NodeValueValidationMessageParam>
): Record<string, string> | undefined => {
  if (Objects.isEmpty(params)) {
    return undefined
  }

  return Object.fromEntries(Object.entries(params).map(([key, value]) => [key, translateParam(t, value)]))
}

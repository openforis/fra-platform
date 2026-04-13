import { TFunction } from 'i18next'

import { NodeValueValidationMessage, NodeValueValidationMessageParam } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Objects } from 'utils/objects'

type ValidatorSumEqualToParams = {
  categoriesSum: NodeValueValidationMessageParam
  categoryLabelKeys: Array<string>
  maxValue: NodeValueValidationMessageParam
}

type ValidatorSumSubCategoriesParams = {
  categoriesSum: NodeValueValidationMessageParam
  categoryLabelKeys: Array<string>
  parentColLabelKey?: string
  parentLabelKey: string
  parentLabelParams?: string
  parentTableAnchor: string
  parentValue: NodeValueValidationMessageParam
}

const _translateParam = (t: TFunction, param: NodeValueValidationMessageParam): string => {
  if (Array.isArray(param)) {
    return `(${param.map((item) => _translateParam(t, item)).join(', ')})`
  }

  return t(String(param))
}

const _translateParams = (
  t: TFunction,
  params?: Record<string, NodeValueValidationMessageParam>
): Record<string, string> | undefined => {
  if (Objects.isEmpty(params)) {
    return undefined
  }

  return Object.fromEntries(Object.entries(params).map(([key, value]) => [key, _translateParam(t, value)]))
}

const _getTranslatedSumEqualToParams = (t: TFunction, params: ValidatorSumEqualToParams): Record<string, string> => {
  return {
    categoryLabels: params.categoryLabelKeys.map((labelKey) => t(labelKey)).join(', '),
    categoriesSum: _translateParam(t, params.categoriesSum),
    maxValue: _translateParam(t, params.maxValue),
  }
}

const _getTranslatedSumSubCategoryParams = (
  t: TFunction,
  params: ValidatorSumSubCategoriesParams
): Record<string, string> => {
  const { categoriesSum, categoryLabelKeys, parentValue } = params

  const parentLabel = `${params.parentTableAnchor} ${t(
    params.parentLabelKey,
    params.parentLabelParams ? JSON.parse(params.parentLabelParams) : null
  )}${params.parentColLabelKey ? ` ${t(params.parentColLabelKey)}` : ''}`

  return {
    categoryLabels: categoryLabelKeys.map((labelKey) => t(labelKey)).join(', '),
    categoriesSum: _translateParam(t, categoriesSum),
    parentLabel,
    parentValue: _translateParam(t, parentValue),
  }
}

export const translateValidationMessage = (t: TFunction, message: NodeValueValidationMessage): string => {
  const { key, params } = message

  if (Objects.isEmpty(params)) {
    return t(key)
  }

  if (message.name === ValidatorName.sumEqualTo) {
    return t(key, _getTranslatedSumEqualToParams(t, params as ValidatorSumEqualToParams))
  }

  if (
    message.name === ValidatorName.sumSubCategoriesNotEqualToParent ||
    message.name === ValidatorName.sumSubCategoriesNotGreaterThanParent
  ) {
    return t(key, _getTranslatedSumSubCategoryParams(t, params as ValidatorSumSubCategoriesParams))
  }

  return t(key, _translateParams(t, params))
}

import { TFunction } from 'i18next'

import { ValidationMessageParam } from 'meta/assessment/validation/validation'

import { translateParam } from './utils'

export type SumSubCategoriesParams = {
  categoriesSum: ValidationMessageParam
  categoryLabelKeys: Array<string>
  parentColLabelKey?: string
  parentLabelKey: string
  parentLabelParams?: string
  parentTableAnchor: string
  parentValue: ValidationMessageParam
}

export const parseSumSubCategories = (t: TFunction, params: SumSubCategoriesParams): Record<string, string> => {
  const parentLabel = `${params.parentTableAnchor} ${t(
    params.parentLabelKey,
    params.parentLabelParams ? JSON.parse(params.parentLabelParams) : null
  )}${params.parentColLabelKey ? ` ${t(params.parentColLabelKey)}` : ''}`

  return {
    categoryLabels: params.categoryLabelKeys.map((labelKey) => t(labelKey)).join(', '),
    categoriesSum: translateParam(t, params.categoriesSum),
    parentLabel,
    parentValue: translateParam(t, params.parentValue),
  }
}

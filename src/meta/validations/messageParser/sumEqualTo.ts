import { TFunction } from 'i18next'

import { ValidationMessageParam } from 'meta/assessment/validation/validation'

import { translateParam } from './utils'

export type SumEqualToParams = {
  categoriesSum: ValidationMessageParam
  categoryLabelKeys: Array<string>
  maxValue: ValidationMessageParam
}

export const parseSumEqualTo = (t: TFunction, params: SumEqualToParams): Record<string, string> => {
  return {
    categoryLabels: params.categoryLabelKeys.map((labelKey) => t(labelKey)).join(', '),
    categoriesSum: translateParam(t, params.categoriesSum),
    maxValue: translateParam(t, params.maxValue),
  }
}

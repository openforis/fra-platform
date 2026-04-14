import { TFunction } from 'i18next'

import { NodeValueValidationMessageParam } from 'meta/assessment/nodeValueValidation'

import { translateParam } from './utils'

export type SumEqualToParams = {
  categoriesSum: NodeValueValidationMessageParam
  categoryLabelKeys: Array<string>
  maxValue: NodeValueValidationMessageParam
}

export const parseSumEqualTo = (t: TFunction, params: SumEqualToParams): Record<string, string> => {
  return {
    categoryLabels: params.categoryLabelKeys.map((labelKey) => t(labelKey)).join(', '),
    categoriesSum: translateParam(t, params.categoriesSum),
    maxValue: translateParam(t, params.maxValue),
  }
}

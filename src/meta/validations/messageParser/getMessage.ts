import { TFunction } from 'i18next'

import { ValidationMessage } from 'meta/assessment/validation/validation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Objects } from 'utils/objects'

import { parseSumEqualTo, SumEqualToParams } from './sumEqualTo'
import { parseSumSubCategories, SumSubCategoriesParams } from './sumSubCategories'
import { translateParams } from './utils'

// Validation messages are rendered as plain text (tooltips), never as HTML, so i18next
// escaping is disabled here. Otherwise params would turn into HTML entities, e.g a national
// class tooltip would show "Production &amp; protection" instead of "Production & protection"
const _translateMessage = (t: TFunction, key: string, params?: Record<string, string>): string =>
  t(key, { ...params, interpolation: { escapeValue: false } })

export const getMessage = (t: TFunction, message: ValidationMessage): string => {
  const { key, params } = message

  if (Objects.isEmpty(params)) {
    return t(key)
  }

  if (message.name === ValidatorName.sumEqualTo) {
    return _translateMessage(t, key, parseSumEqualTo(t, params as SumEqualToParams))
  }

  if (
    message.name === ValidatorName.sumSubCategoriesNotEqualToParent ||
    message.name === ValidatorName.sumSubCategoriesNotGreaterThanParent
  ) {
    return _translateMessage(t, key, parseSumSubCategories(t, params as SumSubCategoriesParams))
  }

  return _translateMessage(t, key, translateParams(t, params))
}

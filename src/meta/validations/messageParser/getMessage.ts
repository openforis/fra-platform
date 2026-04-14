import { TFunction } from 'i18next'

import { NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Objects } from 'utils/objects'

import { parseSumEqualTo, SumEqualToParams } from './sumEqualTo'
import { parseSumSubCategories, SumSubCategoriesParams } from './sumSubCategories'
import { translateParams } from './utils'

export const getMessage = (t: TFunction, message: NodeValueValidationMessage): string => {
  const { key, params } = message

  if (Objects.isEmpty(params)) {
    return t(key)
  }

  if (message.name === ValidatorName.sumEqualTo) {
    return t(key, parseSumEqualTo(t, params as SumEqualToParams))
  }

  if (
    message.name === ValidatorName.sumSubCategoriesNotEqualToParent ||
    message.name === ValidatorName.sumSubCategoriesNotGreaterThanParent
  ) {
    return t(key, parseSumSubCategories(t, params as SumSubCategoriesParams))
  }

  return t(key, translateParams(t, params))
}

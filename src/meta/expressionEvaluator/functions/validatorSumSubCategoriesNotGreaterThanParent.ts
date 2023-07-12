import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorSumSubCategoriesNotGreaterThanParent: ExpressionFunction<Context> = {
  name: 'validatorSumSubCategoriesNotGreaterThanParent',
  minArity: 6,
  executor: ({ t }) => {
    return (
      parentValue: string | undefined,
      parentLabelKey: string,
      parentTableAnchor: string,
      categoryValues: Array<string | undefined>,
      categoryLabelKeys: Array<string>,
      categoryIndex: number
    ): NodeValueValidation => {
      const nonEmptyCategories = categoryValues.reduce<Array<{ labelKey: string; value?: string }>>(
        (acc, value, currentIndex) => {
          if (!Objects.isEmpty(value)) acc.push({ labelKey: categoryLabelKeys[currentIndex], value })
          return acc
        },
        []
      )

      const categoriesSum = Numbers.sum(nonEmptyCategories.map(({ value }) => value))
      const valid =
        Objects.isEmpty(parentValue) ||
        Objects.isEmpty(categoryValues[categoryIndex]) ||
        nonEmptyCategories.length === 0 ||
        Numbers.greaterThanWithTolerance(parentValue, categoriesSum)

      if (valid) {
        return { valid }
      }

      const messages: Array<NodeValueValidationMessage> = [
        {
          key: 'generalValidation.sumSubCategoriesExceedParent',
          params: {
            parentLabel: `${t<string>(parentLabelKey)}(${parentTableAnchor})`,
            parentValue: Numbers.format(Number(parentValue)),
            categoriesSum: Numbers.format(categoriesSum),
            categoryLabels: categoryLabelKeys.map((labelKey) => t<string>(labelKey)).join(', '),
          },
        },
      ]

      return { valid, messages }
    }
  },
}

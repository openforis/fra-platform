import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidationMessage } from 'meta/assessment'
import { Context } from 'meta/expressionEvaluator/context'

type CategoryInfo = { labelKey: string; value?: string }

export const calculateCategoriesSum = (
  categoryValues: Array<string | undefined>,
  categoryLabelKeys: Array<string>
): number => {
  const nonEmptyCategories: CategoryInfo[] = categoryValues.reduce(
    (acc: CategoryInfo[], value: string | undefined, currentIndex: number) => {
      if (!Objects.isEmpty(value)) acc.push({ labelKey: categoryLabelKeys[currentIndex], value })
      return acc
    },
    []
  )

  return Numbers.sum(nonEmptyCategories.map(({ value }) => value))
}

export const getValidationMessage = (
  { t }: Context,
  parentValue: string | undefined,
  parentLabelKey: string,
  parentTableAnchor: string,
  categoriesSum: number,
  categoryLabelKeys: Array<string>,
  label: string,
  parentLabelParams?: string
): Array<NodeValueValidationMessage> => {
  const parentLabel = `${parentTableAnchor} ${t(
    parentLabelKey,
    parentLabelParams ? JSON.parse(parentLabelParams) : null
  )}`

  return [
    {
      key: `generalValidation.${label}`,
      params: {
        parentLabel,
        parentValue: Numbers.format(Number(parentValue)),
        categoriesSum: Numbers.format(categoriesSum),
        categoryLabels: categoryLabelKeys.map((labelKey) => t<string>(labelKey)).join(', '),
      },
    },
  ]
}

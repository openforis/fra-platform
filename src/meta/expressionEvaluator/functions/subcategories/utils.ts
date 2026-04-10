import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

type CategoryInfo = { labelKey: string; value?: string }

export const calculateCategoriesSum = (
  categoryValues: Array<string | undefined>,
  categoryLabelKeys: Array<string>
): number => {
  const nonEmptyCategories: Array<CategoryInfo> = categoryValues.reduce(
    (acc: Array<CategoryInfo>, value: string | undefined, currentIndex: number) => {
      if (!Objects.isEmpty(value)) acc.push({ labelKey: categoryLabelKeys[currentIndex], value })
      return acc
    },
    []
  )

  return Numbers.sum(nonEmptyCategories.map(({ value }) => value))
}

import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

export const calculateCategoriesSum = (categoryValues: Array<string | undefined>): number => {
  const nonEmptyCategoryValues = categoryValues.filter((value) => !Objects.isEmpty(value))

  return Numbers.sum(nonEmptyCategoryValues)
}

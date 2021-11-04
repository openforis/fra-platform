import { FRA } from '@core/assessment'
import * as NumberUtils from '@core/utils/numbers'

import * as ExtentOfForestState from '@webapp/sectionSpec/fra/extentOfForest/extentOfForestState'

export const getExtentOfForestChange = (colIdx: any) => (state: any) => {
  const range = FRA.yearsRange[colIdx]
  const years = range.split('-')
  const yearStart = Number(years[0])
  const yearEnd = Number(years[1])

  const timeSpan = yearEnd - yearStart
  const forestStart = ExtentOfForestState.getForestByYear(yearStart)(state)
  const forestEnd = ExtentOfForestState.getForestByYear(yearEnd)(state)

  return NumberUtils.div(NumberUtils.sub(forestEnd, forestStart), timeSpan)
}

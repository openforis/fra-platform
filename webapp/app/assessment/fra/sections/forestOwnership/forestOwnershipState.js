// import * as NumberUtils from '@common/bignumberUtils'
import * as FRA from '@common/assessment/fra'

// import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

export const years = FRA.years.slice(0, FRA.yearsTable.length - 1)

export const getOtherOrUnknown = () => () => 0
// export const getOtherOrUnknown = colIdx => state => {
// const forest = ExtentOfForestState.getForestByYear(years[colIdx])(state)
// [0, 4].reduce(
//   (value, rowIdx) => NumberUtils.sub(value,  )
// )
// }

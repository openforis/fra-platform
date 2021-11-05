import * as R from 'ramda'
import { Numbers } from '@core/utils/numbers'

/**
 * @deprecated (@use ExtentOfForestState)
 */

export const getValueForYear = (extentOfForest: any, year: any, field: any) => {
  if (!extentOfForest || R.isEmpty(extentOfForest)) return null
  const groupedByYear = R.groupBy(R.prop('name'), extentOfForest.fra)
  return R.path([year, 0, field], groupedByYear)
}

/**
 * @deprecated (@use ExtentOfForestState)
 */
export const getForestAreaForYear = (extentOfForest: any, year: any) =>
  getValueForYear(extentOfForest, year, 'forestArea')

/**
 * @deprecated (@use ExtentOfForestState)
 */
export const getOtherLandAreaForYear = (extentOfForest: any, faoStat: any, year: any) => {
  const forestArea = getValueForYear(extentOfForest, year, 'forestArea')
  const otherWoodedLand = getValueForYear(extentOfForest, year, 'otherWoodedLand')
  const faoStatLandArea = R.path([year, 'area'], faoStat)
  // @ts-ignore
  return Numbers.sub(faoStatLandArea, Numbers.sum([forestArea, otherWoodedLand]))
}

/**
 * @deprecated (TODO Move to state)
 */
export const hasOdps = (fra: any) => {
  if (R.isNil(fra)) return false
  const odps = R.filter((row: any) => row.type === 'odp', fra)
  return odps.length > 0
}

export default {
  getValueForYear,
  getForestAreaForYear,
  getOtherLandAreaForYear,
  hasOdps,
}

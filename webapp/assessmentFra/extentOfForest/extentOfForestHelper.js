import R from 'ramda'
import { sum, sub } from '../../../common/bignumberUtils'

export const getValueForYear = (extentOfForest, year, field) => {
  if (!extentOfForest || R.isEmpty(extentOfForest)) return null
  const groupedByYear = R.groupBy(R.prop('name'), extentOfForest.fra)
  return R.path([year, 0, field], groupedByYear)
}

export const getForestAreaForYear = (extentOfForest, year) =>
  getValueForYear(extentOfForest, year, 'forestArea')

export const getOtherLandAreaForYear = (extentOfForest, faoStat, year) => {
  const forestArea = getValueForYear(extentOfForest, year, 'forestArea')
  const otherWoodedLand = getValueForYear(extentOfForest, year, 'otherWoodedLand')
  const faoStatLandArea = R.path([year, 'area'], faoStat)
  return sub(faoStatLandArea, sum([forestArea, otherWoodedLand]))
}

export const hasOdps = (fra) => {
  if (R.isNil(fra)) return false
  const odps = R.filter(row => row.type === 'odp', fra)
  return odps.length > 0
}

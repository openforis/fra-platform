// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sum'.
const { sum, sub } = require('./bignumberUtils')

/**
 * @deprecated (@use ExtentOfForestState)
 */

const getValueForYear = (extentOfForest: any, year: any, field: any) => {
  if (!extentOfForest || R.isEmpty(extentOfForest)) return null
  const groupedByYear = R.groupBy(R.prop('name'), extentOfForest.fra)
  return R.path([year, 0, field], groupedByYear)
}

/**
 * @deprecated (@use ExtentOfForestState)
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getForestA... Remove this comment to see the full error message
const getForestAreaForYear = (extentOfForest: any, year: any) => getValueForYear(extentOfForest, year, 'forestArea')

/**
 * @deprecated (@use ExtentOfForestState)
 */
const getOtherLandAreaForYear = (extentOfForest: any, faoStat: any, year: any) => {
  const forestArea = getValueForYear(extentOfForest, year, 'forestArea')
  const otherWoodedLand = getValueForYear(extentOfForest, year, 'otherWoodedLand')
  const faoStatLandArea = R.path([year, 'area'], faoStat)
  return sub(faoStatLandArea, sum([forestArea, otherWoodedLand]))
}

/**
 * @deprecated (TODO Move to state)
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'hasOdps'.
const hasOdps = (fra: any) => {
  if (R.isNil(fra)) return false
  const odps = R.filter((row: any) => row.type === 'odp', fra)
  return odps.length > 0
}

module.exports = {
  getValueForYear,
  getForestAreaForYear,
  getOtherLandAreaForYear,
  hasOdps,
}

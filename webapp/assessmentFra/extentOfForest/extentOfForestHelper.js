import R from 'ramda'

export const getForestAreaForYear = (extentOfForest, year) => {
  if (!extentOfForest || R.isEmpty(extentOfForest)) return null
  const groupedByYear = R.groupBy(R.prop('name'), extentOfForest.fra)
  return R.path([year, 0, 'forestArea'], groupedByYear)
}

export const hasOdps = (fra) => {
  if (R.isNil(fra)) return false
  const odps = R.filter(row => row.type === 'odp', fra)
  return odps.length > 0
}

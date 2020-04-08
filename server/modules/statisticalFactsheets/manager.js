const R = require('ramda')
const { getExtentOfForest } = require('./repository')
const countryConfig = require('../../country/countryConfig')

const KEYS = {
  faostat: 'faoStat',
  area: 'area',
  totalArea: 'totalArea',
}

const _getTotalArea = ({ countryIso, year }) => R.pathOr(0, [countryIso, KEYS.faostat, year, KEYS.area], countryConfig)

const foo = async (schemaName = 'public') => {
  const extentOfForest = await getExtentOfForest(schemaName)

  return extentOfForest.map((element) => ({
    ...element,
    [KEYS.totalArea]: _getTotalArea(element),
  }))
}

module.exports = {
  foo,
}

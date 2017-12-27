const R = require('ramda')
const defaultYears = require('./defaultYears')

const buildDefault = year => ({
  year,
  type: 'fra',
  name: year.toString(),
  forestArea: null,
  otherWoodedLand: null,
  otherLand: null
})

module.exports = R.map(year => buildDefault(year), defaultYears)

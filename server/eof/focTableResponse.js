const R = require('ramda')
const defaultYears = require('./defaultYears')

const buildDefault = year => ({
  year,
  type: 'fra',
  name: year.toString(),
  naturalForestArea: null,
  plantationForestArea: null,
  plantationForestIntroducedArea: null,
  otherPlantedForestArea: null
})

module.exports = R.map(year => buildDefault(year), defaultYears)

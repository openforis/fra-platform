const R = require('ramda')

const buildDefault = year => ({
  year,
  name: year.toString(),
  naturalForestArea: null,
  naturalForestPrimaryArea: null,
  plantationForestArea: null,
  plantationForestIntroducedArea: null,
  otherPlantedForestArea: null
})

module.exports.defaultYears = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020]

module.exports.buildDefaultResponse = years =>  R.reduce((a,b) => R.merge(a, {[`fra_${b}`]: buildDefault(b)}), {}, years)

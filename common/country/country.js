const R = require('ramda')

const keys = {
  countryIso: 'countryIso',
  lastEdit: 'lastEdit',
  region: 'region',
  regionIso: 'regionIso',
  fra2020Assessment: 'fra2020Assessment',
  fra2020DeskStudy: 'fra2020DeskStudy',
  panEuropean: 'panEuropean',
}

const getCountryIso = R.prop(keys.countryIso)
const getRegionIso = R.prop(keys.regionIso)
const getLastEdit = R.prop(keys.lastEdit)
const getFra2020Assessment = R.prop(keys.fra2020Assessment)
const isFra2020DeskStudy = R.propEq(keys.fra2020DeskStudy, true)
const isPanEuropean = R.propEq(keys.panEuropean, true)

module.exports = {
  keys,

  getCountryIso,
  getRegionIso,
  getLastEdit,
  getFra2020Assessment,
  isFra2020DeskStudy,
  isPanEuropean,
}

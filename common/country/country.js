const R = require('ramda')
const Area = require('./area')

const keys = {
  countryIso: 'countryIso',
  assessment: 'assessment',
  lastEdit: 'lastEdit',
  regionCodes: 'regionCodes',
  fra2020: 'fra2020',
  deskStudy: 'deskStudy',
  fra2020Assessment: 'fra2020Assessment',
  fra2020DeskStudy: 'fra2020DeskStudy',
  regions: 'regions',
}

const getCountryIso = R.prop(keys.countryIso)
const getRegionCodes = R.propOr([], keys.regionCodes)
const getLastEdit = R.prop(keys.lastEdit)
const getFra2020Assessment = R.prop(keys.fra2020Assessment)
const getRegions = R.propOr([], keys.regions)
const isFra2020DeskStudy = R.propEq(keys.fra2020DeskStudy, true)
const isPanEuropean = R.pipe(getRegions, R.includes(Area.levels.forest_europe))
const isDeskStudy = R.pathOr(null, [keys.assessment, keys.fra2020, keys.deskStudy])

module.exports = {
  keys,

  getCountryIso,
  getRegionCodes,
  getLastEdit,
  getFra2020Assessment,
  getRegions,

  isFra2020DeskStudy,
  isPanEuropean,
  isDeskStudy,
}

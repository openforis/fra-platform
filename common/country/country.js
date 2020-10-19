const R = require('ramda')

const keys = {
  countryIso: 'countryIso',
  assessment: 'assessment',
  fullName: 'fullName',
  listName: 'listName',
  lastEdit: 'lastEdit',
  region: 'region',
  regionIso: 'regionIso',
  fra2020: 'fra2020',
  deskStudy: 'deskStudy',
  fra2020Assessment: 'fra2020Assessment',
  fra2020DeskStudy: 'fra2020DeskStudy',
  panEuropean: 'panEuropean',
}

const getCountryIso = R.prop(keys.countryIso)
const getRegionIso = R.prop(keys.regionIso)
const getFullName = (lang) => R.path([keys.fullName, lang])
const getListName = (lang) => R.path([keys.listName, lang])
const getLastEdit = R.prop(keys.lastEdit)
const getFra2020Assessment = R.prop(keys.fra2020Assessment)
const isFra2020DeskStudy = R.propEq(keys.fra2020DeskStudy, true)
const isPanEuropean = R.propEq(keys.panEuropean, true)
const isDeskStudy = R.pathOr(null, [keys.assessment, keys.fra2020, keys.deskStudy])

module.exports = {
  keys,

  getCountryIso,
  getRegionIso,
  getFullName,
  getListName,
  getLastEdit,
  getFra2020Assessment,
  isFra2020DeskStudy,
  isPanEuropean,
  isDeskStudy,
}

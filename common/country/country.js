const R = require('ramda')

const keys = {
  countryIso: 'countryIso',
  fullName: 'fullName',
  listName: 'listName',
  lastEdit: 'lastEdit',
  region: 'region',
  fra2020Assessment: 'fra2020Assessment',
  fra2020DeskStudy: 'fra2020DeskStudy',
  panEuropean: 'panEuropean',
}

const getFullName = lang => R.path([keys.fullName, lang])
const getListName = lang => R.path([keys.listName, lang])
const getLastEdit = R.prop(keys.lastEdit)
const getFra2020Assessment = R.prop(keys.fra2020Assessment)
const isFra2020DeskStudy = R.propEq(keys.fra2020DeskStudy, true)
const isPanEuropean = R.propEq(keys.panEuropean, true)

module.exports = {
  keys,

  getFullName,
  getListName,
  getLastEdit,
  getFra2020Assessment,
  isFra2020DeskStudy,
  isPanEuropean,
}

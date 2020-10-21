const Strings = require('../strings')

const levels = {
  global: 'WO',
  europe: 'EU',
}

const getListName = (isoCode, i18n) => i18n.t(`area.${isoCode}.listName`)
const getCompareListName = (i18n) => (isoCode1, isoCode2) =>
  Strings.normalize(getListName(isoCode1, i18n)) > Strings.normalize(getListName(isoCode2, i18n)) ? 1 : -1
const isISOGlobal = (isoCode) => isoCode === levels.global
const isISOCountry = (isoCode) => /^[a-zA-Z0-9]{3}$/.test(isoCode)

module.exports = {
  levels,
  getListName,
  getCompareListName,
  isISOGlobal,
  isISOCountry,
}

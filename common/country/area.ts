const Strings = require('../strings')

const levels = {
  global: 'WO',
  forest_europe: 'FE',
}

const getListName = (isoCode: any, i18n: any) => i18n.t(`area.${isoCode}.listName`)
const getCompareListName = (i18n: any) => (isoCode1: any, isoCode2: any) =>
  Strings.normalize(getListName(isoCode1, i18n)) > Strings.normalize(getListName(isoCode2, i18n)) ? 1 : -1
const isISOGlobal = (isoCode: any) => isoCode === levels.global
const isISOCountry = (isoCode: any) => /^[a-zA-Z0-9]{3}$/.test(isoCode)

module.exports = {
  levels,
  getListName,
  getCompareListName,
  isISOGlobal,
  isISOCountry,
}

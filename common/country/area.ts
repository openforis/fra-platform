import * as Strings from '../strings'

export const levels = {
  global: 'WO',
  forest_europe: 'FE',
}

export const getListName = (isoCode: any, i18n: any) => i18n.t(`area.${isoCode}.listName`)
export const getCompareListName = (i18n: any) => (isoCode1: any, isoCode2: any) =>
  Strings.normalize(getListName(isoCode1, i18n)) > Strings.normalize(getListName(isoCode2, i18n)) ? 1 : -1
export const isISOGlobal = (isoCode: any) => isoCode === levels.global
export const isISOCountry = (isoCode: any) => /^[a-zA-Z0-9]{3}$/.test(isoCode)

export default {
  levels,
  getListName,
  getCompareListName,
  isISOGlobal,
  isISOCountry,
}

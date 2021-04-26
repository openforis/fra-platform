import { i18n } from 'i18next'
import * as Strings from '../strings'

export const levels = {
  global: 'WO',
  forest_europe: 'FE',
}

export const languageToLocale = (isoCode: string): string => {
  // Currently: es | en | ru | zh => zh-cn
  if (isoCode.includes('zh')) return 'zh-CN'
  return isoCode
}

export const getListName = (isoCode: any, i18n: any) => i18n.t(`area.${isoCode}.listName`)
export const getCompareListName = (i18n: i18n) => (isoCode1: any, isoCode2: any) => {
  const country1 = Strings.normalize(getListName(isoCode1, i18n))
  const country2 = Strings.normalize(getListName(isoCode2, i18n))
  const locale = languageToLocale(i18n.language)
  return country1.localeCompare(country2, locale)
}

export const isISOGlobal = (isoCode: any) => isoCode === levels.global
export const isISOCountry = (isoCode: any) => /^[a-zA-Z0-9]{3}$/.test(isoCode)

export default {
  levels,
  getListName,
  getCompareListName,
  isISOGlobal,
  isISOCountry,
}

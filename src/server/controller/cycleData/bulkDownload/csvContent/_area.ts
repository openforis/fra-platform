import { i18n as i18nType } from 'i18next'

import { AreaCode } from 'meta/area/areaCode'
import { Areas } from 'meta/area/areas'

export const getAreaLabel = (props: { code: AreaCode; i18n: i18nType }): string => {
  const { code, i18n } = props
  return i18n.t(Areas.getTranslationKey(code))
}

import { Locale } from 'date-fns'
import { ar, enUS, es, fr, ru, zhCN } from 'date-fns/locale'

import { Lang } from 'meta/lang'

const localeMap: Record<Lang, Locale> = {
  [Lang.en]: enUS,
  [Lang.es]: es,
  [Lang.fr]: fr,
  [Lang.ru]: ru,
  [Lang.ar]: ar,
  [Lang.zh]: zhCN,
}

export const getLocale = (languageCode: Lang): Locale => {
  return localeMap[languageCode] ?? enUS
}

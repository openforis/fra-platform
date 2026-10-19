import '../scriptInit'

import { arTranslation } from 'i18n/resources/ar'
import { enTranslation } from 'i18n/resources/en'
import { esTranslation } from 'i18n/resources/es'
import { frTranslation } from 'i18n/resources/fr'
import { ruTranslation } from 'i18n/resources/ru'
import { zhTranslation } from 'i18n/resources/zh'

import { Lang, LanguageCodes } from 'meta/lang'
import { Objects } from 'utils/objects'

import { Logger } from 'server/utils/logger'

const translations: Record<Lang, Record<string, unknown>> = {
  [Lang.ar]: arTranslation,
  [Lang.en]: enTranslation,
  [Lang.es]: esTranslation,
  [Lang.fr]: frTranslation,
  [Lang.ru]: ruTranslation,
  [Lang.zh]: zhTranslation,
}

const getKeys = (lang: Lang): Array<string> => Object.keys(Objects.flatten(translations[lang]))

// panEuropean is not sent to Crowdin, see crowdin.yml
// kiosk doesn't support other languages
const enKeys = getKeys(Lang.en).filter((key) => !/(panEuropean|kiosk)\./.test(key))

const nonEnglishLanguages = LanguageCodes.filter((lang) => lang !== Lang.en)

nonEnglishLanguages.forEach((lang) => {
  const langKeys = new Set(getKeys(lang))
  const missing = enKeys.filter((key) => !langKeys.has(key))

  Logger.info(`${lang}: ${missing.length} missing`)
  missing.forEach((key) => Logger.info(`  ${key}`))
})

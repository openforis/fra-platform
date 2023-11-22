import * as i18next from 'i18next'
import { TFunction } from 'i18next'

import { Lang } from 'meta/lang'

import * as arTranslation from './resources/ar'
import * as enTranslation from './resources/en'
import * as esTranslation from './resources/es'
import * as frTranslation from './resources/fr'
import * as ruTranslation from './resources/ru'
import * as zhTranslation from './resources/zh'

// @ts-ignore
const createInstance = i18next.createInstance || i18next.default.createInstance

const translationsFiles: { [langCode: string]: any } = {
  en: enTranslation.translation,
  es: esTranslation.translation,
  fr: frTranslation.translation,
  ru: ruTranslation.translation,
  ar: arTranslation.translation,
  zh: zhTranslation.translation,
}

const format = (value: any, format: string) => {
  if (format === 'bulletList' && Array.isArray(value)) {
    // Bullet list expected format: [{ name: 'name/translation.key', suffixes?: ['suffix', 'translation.key'] }]
    const bulletstr = '•'
    const _value = value.map((item: any) => {
      const key = `$t(${item.key})`
      const suffix = item.suffixes ? `(${item.suffixes.map((suffix: any) => `$t(${suffix})`).join(', ')})` : ''

      return `${bulletstr} ${key} ${suffix}\n`
    })
    return _value.join('')
  }
  return value
}

export const createParams = (lang: string) => ({
  fallbackLng: 'en',
  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
    skipOnVariables: false,
    format,
  },

  // react i18next special options (optional)
  react: {
    wait: false, // set to true if you like to wait for loaded in every translated hoc
    nsMode: 'default', // set it to fallback to let passed namespaces to translated hoc act as fallbacks
  },

  lng: lang,

  resources: {
    en: {
      translation: translationsFiles.en,
    },
    es: {
      translation: translationsFiles.es,
    },
    fr: {
      translation: translationsFiles.fr,
    },
    ru: {
      translation: translationsFiles.ru,
    },
    ar: {
      translation: translationsFiles.ar,
    },
    zh: {
      translation: translationsFiles.zh,
    },
  },
})

export const createI18nPromise = (lang: any): Promise<{ language: Lang; t: TFunction }> =>
  new Promise((resolve, reject) =>
    // @ts-ignore
    // eslint-disable-next-line no-promise-executor-return
    createInstance(createParams(lang), (err: any, t: any) => {
      if (err) {
        reject(err)
        return
      }
      resolve({ language: lang, t })
    })
  )

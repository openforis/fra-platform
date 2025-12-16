import i18next, { InitOptions, TFunction } from 'i18next'

import { Lang } from 'meta/lang'

import { arTranslation } from './resources/ar'
import { enTranslation } from './resources/en'
import { esTranslation } from './resources/es'
import { frTranslation } from './resources/fr'
import { ruTranslation } from './resources/ru'
import { zhTranslation } from './resources/zh'

const translationsFiles = {
  [Lang.en]: enTranslation,
  [Lang.es]: esTranslation,
  [Lang.fr]: frTranslation,
  [Lang.ru]: ruTranslation,
  [Lang.ar]: arTranslation,
  [Lang.zh]: zhTranslation,
}

export const createParams = (lang: Lang): InitOptions => ({
  fallbackLng: Lang.en,
  debug: false,

  react: {
    useSuspense: false,
  },

  lng: lang,

  resources: {
    [Lang.en]: {
      translation: translationsFiles[Lang.en],
    },
    [Lang.es]: {
      translation: translationsFiles[Lang.es],
    },
    [Lang.fr]: {
      translation: translationsFiles[Lang.fr],
    },
    [Lang.ru]: {
      translation: translationsFiles[Lang.ru],
    },
    [Lang.ar]: {
      translation: translationsFiles[Lang.ar],
    },
    [Lang.zh]: {
      translation: translationsFiles[Lang.zh],
    },
  },
})

export const createI18nPromise = (lang: Lang): Promise<{ language: Lang; t: TFunction }> =>
  new Promise((resolve, reject) => {
    i18next.createInstance(createParams(lang), (err, t) => {
      if (err) {
        reject(err)
        return
      }
      resolve({ language: lang, t })
    })
  })

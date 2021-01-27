const i18next = require('i18next')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')

const createInstance = i18next.createInstance || i18next.default.createInstance

const enTranslation = require('./resources/en').translation
const frTranslation = require('./resources/fr').translation
const esTranslation = require('./resources/es').translation
const ruTranslation = require('./resources/ru').translation

const translationsFiles = {
  en: enTranslation,
  es: esTranslation,
  fr: frTranslation,
  ru: ruTranslation,
}

const createParams = (lang: any) => ({
  fallbackLng: 'en',
  debug: false,

  // react i18next special options (optional)
  react: {
    wait: false, // set to true if you like to wait for loaded in every translated hoc
    nsMode: 'default', // set it to fallback to let passed namespaces to translated hoc act as fallbacks
  },

  lng: lang,

  resources: {
    [lang]: {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      translation: translationsFiles[lang],
    },
  },
})

const createI18nInstance = (lang: any, callback: any) =>
  createInstance(createParams(lang), (err: any, t: any) => callback({ language: lang, t }))

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createI18n... Remove this comment to see the full error message
const createI18nPromise = (lang: any) =>
  new Promise((resolve, reject) =>
    createInstance(createParams(lang), (err: any, t: any) => {
      if (err) reject(err)
      resolve({ language: lang, t })
    })
  )

module.exports.createI18nInstance = createI18nInstance
module.exports.createI18nPromise = createI18nPromise

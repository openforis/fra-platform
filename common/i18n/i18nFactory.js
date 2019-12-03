const i18next = require('i18next')
const Promise = require('bluebird')

const createInstance = i18next.createInstance || i18next.default.createInstance

const enTranslation = require('./resources/en').translation
const frTranslation = require('./resources/fr').translation
const esTranslation = require('./resources/es').translation
const ruTranslation = require('./resources/ru').translation

const createParams = lang => ({
  fallbackLng: 'en',
  debug: false,

  // react i18next special options (optional)
  react: {
    wait: false, // set to true if you like to wait for loaded in every translated hoc
    nsMode: 'default' // set it to fallback to let passed namespaces to translated hoc act as fallbacks
  },
  lng: lang,
  resources: {
    en: {
      translation: enTranslation
    },
    fr: {
      translation: frTranslation
    },
    es: {
      translation: esTranslation
    },
    ru: {
      translation: ruTranslation
    }
  }
})

const createI18nInstance = (lang, callback) => createInstance(
  createParams(lang),
  (err, t) => callback({ language: lang, t })
)

const createI18nPromise = lang => new Promise(
  (resolve, reject) => createInstance(
    createParams(lang),
    (err, t) => {
      if (err) reject(err)
      resolve({ language: lang, t })
    })
)

module.exports.createI18nInstance = createI18nInstance
module.exports.createI18nPromise = createI18nPromise

const i18next = require('i18next')

const enTranslation = require('./resources/en').translation
const frTranslation = require('./resources/fr').translation
const esTranslation = require('./resources/es').translation
const ruTranslation = require('./resources/ru').translation

const createI18nInstance = (lang, callback) =>
  i18next.createInstance({
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
    },
    (err, t) => callback({language: lang, t}))

module.exports.createI18nInstance = createI18nInstance

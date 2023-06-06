import { initReactI18next } from 'react-i18next'

import { createParams } from 'i18n/i18nFactory'
import i18n from 'i18next'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(createParams('en'))

export default i18n

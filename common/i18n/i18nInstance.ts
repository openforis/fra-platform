import { i18n } from 'i18next'
import { createI18nPromise } from './i18nFactory'

export type I18nInstanceType = Partial<i18n>

class I18nInstance {
  _i18nInstance: I18nInstanceType = null

  _language = 'en'

  constructor(lang = 'en') {
    this._language = lang
  }

  async init() {
    this._i18nInstance = await createI18nPromise(this._language)
  }

  async update(lang: string) {
    this._language = lang
    this._i18nInstance = await createI18nPromise(this._language)
  }

  getInstance() {
    return this._i18nInstance
  }
}

const instance = new I18nInstance()
instance.init()

export default instance

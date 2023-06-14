import { i18n } from 'i18next'

import { Lang } from 'meta/lang'

export const updateLanguage = async (lang: Lang, i18n: i18n) => {
  await i18n.changeLanguage(lang)
  await localStorage.setItem('i18n/lang', lang)
  if (lang === 'ar') document.body.classList.add('rtl')
  if (lang !== 'ar') document.body.classList.remove('rtl')
}

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Lang, LanguageCodes } from 'meta/lang'

import Icon from 'client/components/Icon'
import PopoverControl from 'client/components/PopoverControl'

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()

  const updateLanguage = async (lang: Lang) => {
    await i18n.changeLanguage(lang)
    await localStorage.setItem('i18n/lang', lang)
    if (lang === 'ar') document.body.classList.add('rtl')
    if (lang !== 'ar') document.body.classList.remove('rtl')
  }

  const languageSelectionItems = LanguageCodes.map((lang: Lang) => ({
    content: i18n.t(`language.${lang}`),
    onClick: () => updateLanguage(lang),
  }))

  return (
    <PopoverControl items={languageSelectionItems}>
      <div className="app-header__menu-item">
        {i18n.t<string>(`language.${i18n.language}`)}
        <Icon className="icon-middle" name="small-down" />
      </div>
    </PopoverControl>
  )
}
export default LanguageSelector

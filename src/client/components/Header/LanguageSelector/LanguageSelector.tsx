import React from 'react'

import { Lang, LanguageCodes } from '@meta/lang'

import PopoverControl from '@client/components/PopoverControl'
import Icon from '@client/components/Icon'
import { useTranslation } from 'react-i18next'

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()

  const updateLanguage = async (lang: Lang) => {
    await i18n.changeLanguage(lang)
    await localStorage.setItem('i18n/lang', lang)
  }

  const languageSelectionItems = LanguageCodes.map((lang: Lang) => ({
    content: i18n.t(`language.${lang}`),
    onClick: () => updateLanguage(lang),
  }))

  return (
    <PopoverControl items={languageSelectionItems}>
      <div className="app-header__menu-item">
        {i18n.t(`language.${i18n.language}`)}
        <Icon className="icon-middle" name="small-down" />
      </div>
    </PopoverControl>
  )
}
export default LanguageSelector

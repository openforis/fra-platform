import React from 'react'
import { useDispatch } from 'react-redux'

import { LanguageCodes } from '@common/lang'
import { AppActions } from '@webapp/store/app'

import { useI18n } from '@webapp/components/hooks'
import PopoverControl from '@webapp/components/PopoverControl'
import Icon from '@webapp/components/icon'

const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch()
  const i18n = useI18n()

  const languageSelectionItems = LanguageCodes.map((lang) => ({
    content: i18n.t(`language.${lang}`),
    onClick: () => dispatch(AppActions.switchLanguage(lang)),
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

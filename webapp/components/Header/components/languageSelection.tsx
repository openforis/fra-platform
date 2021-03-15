import React from 'react'
import { useDispatch } from 'react-redux'
import * as R from 'ramda'
import { PopoverControl } from '@webapp/components/popoverControl'
import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'
import { AppActions } from '@webapp/store/app'

const LanguageSelection = () => {
  const dispatch = useDispatch()
  const i18n = useI18n()
  const supportedLangs = ['en', 'fr', 'es', 'ru', 'ar']
  const languageSelectionItems = R.pipe(
    R.reject((l: any) => l === (i18n as any).language),
    R.map((lang: any) => ({
      content: (i18n as any).t(`language.${lang}`),
      onClick: () => dispatch(AppActions.switchLanguage(lang)),
    }))
  )(supportedLangs)
  return (
    <PopoverControl items={languageSelectionItems}>
      <div className="app-header__menu-item">
        {(i18n as any).t(`language.${(i18n as any).language}`)}
        <Icon className="icon-middle" name="small-down" />
      </div>
    </PopoverControl>
  )
}
export default LanguageSelection

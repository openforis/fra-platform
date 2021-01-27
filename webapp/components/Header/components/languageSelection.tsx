import React from 'react'
import { useDispatch } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
import { PopoverControl } from '@webapp/components/popoverControl'
import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'
import { AppActions } from '@webapp/store/app'

const LanguageSelection = () => {
  const dispatch = useDispatch()
  const i18n = useI18n()
  const supportedLangs = ['en', 'fr', 'es', 'ru']
  const languageSelectionItems = R.pipe(
    R.reject((l: any) => l === (i18n as any).language),
    R.map((lang: any) => ({
      content: (i18n as any).t(`language.${lang}`),
      onClick: () => dispatch(AppActions.switchLanguage(lang)),
    }))
  )(supportedLangs)
  return (
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; items: any; }' is not a... Remove this comment to see the full error message
    <PopoverControl items={languageSelectionItems}>
      <div className="app-header__menu-item">
        {(i18n as any).t(`language.${(i18n as any).language}`)}
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; name: string; }' is not... Remove this comment to see the full error message */}
        <Icon className="icon-middle" name="small-down" />
      </div>
    </PopoverControl>
  )
}
export default LanguageSelection

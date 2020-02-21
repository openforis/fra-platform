import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { PopoverControl } from '@webapp/components/popoverControl'
import Icon from '@webapp/components/icon'

import * as UserState from '@webapp/user/userState'

import { switchLanguage } from '@webapp/user/actions'

const LanguageSelection = () => {
  const dispatch = useDispatch()
  const i18n = useSelector(UserState.getI18n)

  const supportedLangs = ['en', 'fr', 'es', 'ru']
  const languageSelectionItems = R.pipe(
    R.reject(l => l === i18n.language),
    R.map(lang => ({
      content: i18n.t(`language.${lang}`),
      onClick: () => dispatch(switchLanguage(lang))
    }))
  )(supportedLangs)

  return (
    <PopoverControl items={languageSelectionItems}>
      <div className="fra-header__menu-item">
        {i18n.t(`language.${i18n.language}`)}
        <Icon className="icon-middle" name="small-down"/>
      </div>
    </PopoverControl>
  )
}

export default LanguageSelection

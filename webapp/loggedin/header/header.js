import './header.less'

import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import UserInfoLinks from '@webapp/loggedin/header/_components/userInfo'
import LanguageSelection from '@webapp/loggedin/header/_components/languageSelection'
import AdminLinks from '@webapp/loggedin/header/_components/adminLinks'
import AutoSaveStatusText from '@webapp/loggedin/header/_components/autoSaveStatusText'
import ToggleNavigationControl from '@webapp/loggedin/header/_components/toggleNavigationControl'
import CountrySelection from '@webapp/loggedin/countrySelection'
import useI18n from '@webapp/components/hooks/useI18n'

import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/user/userState'
import * as ReviewState from '@webapp/loggedin/review/reviewState'

const Header = () => {
  const userInfo = useSelector(UserState.getUserInfo)
  const countryIso = useSelector(AppState.getCountryIso)
  const commentsOpen = useSelector(ReviewState.getOpenThread)
  const i18n = useI18n()
  // TODO use navigation state
  const navigationVisible = useSelector(state => countryIso ? state.navigation.navigationVisible : false)

  const commentColumnCurrentWidth = commentsOpen ? 288 : 0
  const navigationCurrentWidth = navigationVisible ? 256 : 0
  const subtractFromHeaderWidth = commentColumnCurrentWidth + navigationCurrentWidth

  const style = {
    left: `${navigationCurrentWidth}px`,
    width: `calc(100vw - ${subtractFromHeaderWidth}px)`
  }
  return (
    <div className="fra-header__container no-print" style={style}>
      <div className="fra-header">
        {
          countryIso
            ? <ToggleNavigationControl/>
            : <CountrySelection/>
        }
        <AutoSaveStatusText/>

        <div className="fra-header__menu">
          <LanguageSelection/>
          <UserInfoLinks/>
          <AdminLinks/>

          {
            !userInfo &&
            <Link key="admin-link"
                  to={`/login/`}
                  className="fra-header__menu-item">
              {i18n.t('common.login')}
            </Link>
          }
        </div>
      </div>
    </div>
  )
}

export default Header

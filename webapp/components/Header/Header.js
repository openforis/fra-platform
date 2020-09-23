import './header.less'
import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import { useI18n, useUserInfo } from '@webapp/components/hooks'

import UserInfoLinks from './components/userInfo'
import LanguageSelection from './components/languageSelection'
import LinkHome from './components/linkHome'

const Header = () => {
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const { pathname } = useLocation()
  const isLogin = Boolean(matchPath(pathname, { path: BasePaths.login }))

  return (
    <div className="app-header no-print">
      <img alt="FAO" src={`/img/fao/FAO${i18n.language}.svg`} />

      <div className="app-header__separator" />

      <div className="app-header__global-fra">{i18n.t('common.globalFRA')}</div>

      <div className="app-header__menu">
        <LanguageSelection />

        {userInfo && <UserInfoLinks />}

        {!userInfo && !isLogin && (
          <Link key="admin-link" to={BasePaths.login} className="app-header__menu-item">
            {i18n.t('common.login')}
          </Link>
        )}

        <LinkHome />
      </div>
    </div>
  )
}

export default Header

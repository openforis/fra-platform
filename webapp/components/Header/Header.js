import './header.less'
import React from 'react'
import { Link } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import { useI18n, useIsLogin, useUserInfo } from '@webapp/components/hooks'

import Logo from './Logo'
import UserInfoLinks from './components/userInfo'
import LanguageSelection from './components/languageSelection'
import LinkHome from './components/linkHome'

const Header = () => {
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const isLogin = useIsLogin()

  return (
    <div className="app-header no-print">
      <Logo />

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

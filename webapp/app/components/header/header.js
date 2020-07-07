import './header.less'
import React from 'react'
import { Link } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import { useI18n, useUserInfo } from '@webapp/components/hooks'

import UserInfoLinks from './components/userInfo'
import LanguageSelection from './components/languageSelection'
import AutoSaveStatusText from './components/autoSaveStatusText'
import LinkHome from './components/linkHome'

const Header = () => {
  const userInfo = useUserInfo()
  const i18n = useI18n()

  return (
    <div className="app-header no-print">
      <img alt="FAO" src={`/img/FAO${i18n.language}.svg`} />

      <div className="app-header__separator" />

      <div className="app-header__global-fra">
        {i18n.t('common.globalFRA')}
        <AutoSaveStatusText />
      </div>

      <div className="app-header__menu">
        <LanguageSelection />

        {userInfo ? (
          <UserInfoLinks />
        ) : (
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

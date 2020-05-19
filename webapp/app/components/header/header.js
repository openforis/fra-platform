import './header.less'

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import { useI18n, useUserInfo } from '@webapp/components/hooks'
import UserInfoLinks from './components/userInfo'
import LanguageSelection from './components/languageSelection'
import AppLinks from './components/AppLinks'
import AutoSaveStatusText from './components/autoSaveStatusText'
import ToggleNavigationControl from './components/toggleNavigationControl'

const Header = (props) => {
  const { hideLinks, hideNavigationControl } = props

  const userInfo = useUserInfo()
  const i18n = useI18n()

  return (
    <div className="app-header no-print">
      {hideNavigationControl ? <div /> : <ToggleNavigationControl />}

      <AutoSaveStatusText />

      <div className="app-header__menu">
        <AppLinks i18n={i18n} />
        {!hideLinks && (
          <>
            <LanguageSelection />
            <UserInfoLinks />
            {!userInfo && (
              <Link key="admin-link" to={BasePaths.login} className="app-header__menu-item">
                {i18n.t('common.login')}
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  )
}

Header.propTypes = {
  hideLinks: PropTypes.bool,
  hideNavigationControl: PropTypes.bool,
}

Header.defaultProps = {
  hideLinks: false,
  hideNavigationControl: false,
}

export default Header

import './header.less'

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import UserInfoLinks from '@webapp/app/components/header/components/userInfo'
import LanguageSelection from '@webapp/app/components/header/components/languageSelection'
import AdminLinks from '@webapp/app/components/header/components/adminLinks'
import AppLinks from '@webapp/app/components/header/components/AppLinks'
import AutoSaveStatusText from '@webapp/app/components/header/components/autoSaveStatusText'
import ToggleNavigationControl from '@webapp/app/components/header/components/toggleNavigationControl'
import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const Header = ({ hideLinks, hideNavigationControl }) => {
  const userInfo = useUserInfo()
  const countryIso = useCountryIso()
  const i18n = useI18n()

  return (
    <div className="app-header no-print">
      {countryIso && !hideNavigationControl ? <ToggleNavigationControl /> : <div />}

      <AutoSaveStatusText />

      <div className="app-header__menu">
        <AppLinks i18n={i18n} />
        {!hideLinks && (
          <>
            <LanguageSelection />
            <UserInfoLinks />
            <AdminLinks />
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

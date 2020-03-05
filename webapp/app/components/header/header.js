import './header.less'

import React from 'react'
import { Link } from 'react-router-dom'

import UserInfoLinks from '@webapp/app/components/header/components/userInfo'
import LanguageSelection from '@webapp/app/components/header/components/languageSelection'
import AdminLinks from '@webapp/app/components/header/components/adminLinks'
import AutoSaveStatusText from '@webapp/app/components/header/components/autoSaveStatusText'
import ToggleNavigationControl from '@webapp/app/components/header/components/toggleNavigationControl'
import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import AppLinks from './AppLinks'

const AdminLink = ({ i18n }) =>
  <Link key="admin-link"
    to={`/login/`}
    className="app-header__menu-item">
    {i18n.t('common.login')}
  </Link>

const HeaderLinks = ({ i18n, userInfo }) => <>
  <LanguageSelection />
  <UserInfoLinks />
  <AdminLinks />
  {
    !userInfo &&
    <AdminLink i18n={i18n} />
  }
</>

const Header = ({ hideLinks, hideNavigationControl }) => {
  const userInfo = useUserInfo()
  const countryIso = useCountryIso()
  const i18n = useI18n()

  return (
    <div className="app-header no-print">
      {
        countryIso && !hideNavigationControl
          ? <ToggleNavigationControl />
          : <div />
      }

      <AutoSaveStatusText />

      <div className="app-header__menu">
        <AppLinks i18n={i18n} />
        {
          !hideLinks && <HeaderLinks i18n={i18n} userInfo={userInfo} />
        }
      </div>
    </div>
  )
}

Header.defaultProps = {
  hideLinks: false,
  hideNavigationControl: false
}

export default Header

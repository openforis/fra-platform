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

const Header = () => {
  const userInfo = useUserInfo()
  const countryIso = useCountryIso()
  const i18n = useI18n()

  return (
    <div className="app-header no-print">
      {
        countryIso
          ? <ToggleNavigationControl/>
          : <div/>
      }
      <AutoSaveStatusText/>

      <div className="app-header__menu">
        <LanguageSelection/>
        <UserInfoLinks/>
        <AdminLinks/>

        {
          !userInfo &&
          <Link key="admin-link"
                to={`/login/`}
                className="app-header__menu-item">
            {i18n.t('common.login')}
          </Link>
        }
      </div>
    </div>
  )
}

export default Header

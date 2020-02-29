import './header.less'

import React from 'react'
import { Link } from 'react-router-dom'

import UserInfoLinks from '@webapp/loggedin/header/_components/userInfo'
import LanguageSelection from '@webapp/loggedin/header/_components/languageSelection'
import AdminLinks from '@webapp/loggedin/header/_components/adminLinks'
import AutoSaveStatusText from '@webapp/loggedin/header/_components/autoSaveStatusText'
import ToggleNavigationControl from '@webapp/loggedin/header/_components/toggleNavigationControl'
import CountrySelection from '@webapp/loggedin/countrySelection'
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
            : <CountrySelection/>
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

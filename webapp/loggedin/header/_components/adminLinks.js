import React from 'react'
import { useSelector } from 'react-redux'

import { isAdministrator } from '@common/countryRole'

import { Link } from 'react-router-dom'

import * as UserState from '@webapp/user/userState'
import * as AppState from '@webapp/app/appState'

const AdminLinks = () => {
  const userInfo = useSelector(UserState.getUserInfo)
  const i18n = useSelector(UserState.getI18n)
  const countryIso = useSelector(AppState.getCountryIso)

  return userInfo && isAdministrator(userInfo) && (
    <>
      <div key="v-separator" className="fra-header__menu-item-separator" style={{ margin: '0 20px' }}/>
      <Link key="admin-link"
            to={`/country/${countryIso}/admin/`}
            className="fra-header__menu-item">
        {i18n.t('admin.admin')}
      </Link>
    </>
  )
}

export default AdminLinks

import React from 'react'
import { useSelector } from 'react-redux'

import { isAdministrator } from '@common/countryRole'

import { Link } from 'react-router-dom'
import useI18n from '@webapp/components/hooks/useI18n'

import * as UserState from '@webapp/user/userState'
import * as AppState from '@webapp/app/appState'

const AdminLinks = () => {
  const userInfo = useSelector(UserState.getUserInfo)
  const countryIso = useSelector(AppState.getCountryIso)
  const i18n = useI18n()

  if (!isAdministrator(userInfo)) {
    return null
  }

  return (
    <>
      <div key="v-separator" className="app-header__menu-item-separator" style={{ margin: '0 20px' }}/>
      <Link key="admin-link"
            to={`/country/${countryIso}/admin/`}
            className="app-header__menu-item">
        {i18n.t('admin.admin')}
      </Link>
    </>
  )
}

export default AdminLinks

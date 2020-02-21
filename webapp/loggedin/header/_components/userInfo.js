import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PopoverControl } from '@webapp/components/popoverControl'
import Icon from '@webapp/components/icon'

import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/user/userState'

import { logout } from '@webapp/user/actions'

const UserInfoLinks = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(UserState.getUserInfo)
  const i18n = useSelector(UserState.getI18n)
  const countryIso = useSelector(AppState.getCountryIso)

  return userInfo && (
    <PopoverControl
      items={[{
        content: i18n.t('header.logout'),
        onClick: () => dispatch(logout())
      }, {
        divider: true
      }, {
        content: i18n.t('header.editProfile'),
        link: `/country/${countryIso}/user/${userInfo.id}`,
      }]}>

      <div className="fra-header__menu-item">
        {userInfo.name}
        <Icon className="icon-middle" name="small-down"/>
      </div>

    </PopoverControl>
  )
}

export default UserInfoLinks

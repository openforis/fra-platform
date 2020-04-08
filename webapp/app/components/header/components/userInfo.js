import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isAdministrator } from '@common/countryRole'
import { profilePictureUri } from '@common/userUtils'

import { PopoverControl } from '@webapp/components/popoverControl'
import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'

import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/user/userState'

import { logout } from '@webapp/user/actions'

const UserInfoLinks = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(UserState.getUserInfo)
  const countryIso = useSelector(AppState.getCountryIso)
  const i18n = useI18n()

  if (!userInfo) {
    return null
  }

  const items = [
    {
      content: i18n.t('header.editProfile'),
      link: `/country/${countryIso}/user/${userInfo.id}`,
    },
  ]

  if (isAdministrator(userInfo)) {
    // TODO update path - see https://github.com/openforis/fra-platform/issues/139
    items.push({
      content: i18n.t('admin.admin'),
      link: `/country/${countryIso}/admin/`,
    })
  }

  items.push(
    {
      divider: true,
    },
    {
      content: i18n.t('header.logout'),
      onClick: () => dispatch(logout()),
    }
  )

  return (
    <PopoverControl items={items}>
      <div className="app-header__menu-item-user">
        <img src={profilePictureUri(countryIso, userInfo.id)} alt={userInfo.name} />
        <Icon className="icon-middle" name="small-down" />
      </div>
    </PopoverControl>
  )
}

export default UserInfoLinks

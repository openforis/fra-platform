import React from 'react'
import { useDispatch } from 'react-redux'

import { isAdministrator } from '@common/countryRole'

import { useI18n, useUserInfo } from '@webapp/components/hooks'
import { PopoverControl } from '@webapp/components/popoverControl'
import Icon from '@webapp/components/icon'

import * as BasePaths from '@webapp/main/basePaths'

import { logout } from '@webapp/user/actions'

const UserInfoLinks = () => {
  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  const i18n = useI18n()

  const items = [
    {
      content: i18n.t('header.editProfile'),
      link: BasePaths.getUserProfileLink(userInfo.id),
    },
  ]

  if (isAdministrator(userInfo)) {
    items.push({
      content: i18n.t('admin.admin'),
      link: BasePaths.admin,
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
      <div className="app-header__menu-item">
        {userInfo.name}
        <Icon className="icon-middle" name="small-down" />
      </div>
    </PopoverControl>
  )
}

export default UserInfoLinks

import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { i18n } from 'i18next'

import { User, Users } from '@core/auth'
import * as BasePaths from '@webapp/main/basePaths'
import { useI18n, useIsLogin, useUserInfo } from '@webapp/components/hooks'
import { logout } from '@webapp/store/user/actions'

import Icon from '@webapp/components/icon'
import PopoverControl, { PopoverItem } from '@webapp/components/PopoverControl'

const getLinks = (i18nInstance: i18n, userInfo: User, dispatch: Dispatch<any>) => {
  const items: Array<PopoverItem> = [
    {
      content: i18nInstance.t('header.editProfile'),
      link: BasePaths.getUserProfileLink(userInfo.id),
    },
  ]
  if (Users.isAdministrator(userInfo)) {
    items.push({
      content: i18nInstance.t('admin.admin'),
      link: BasePaths.admin,
    })
  }
  items.push(
    {
      divider: true,
    },
    {
      content: i18nInstance.t('header.logout'),
      onClick: () => dispatch(logout()),
    }
  )
  return items
}

const LinksFRA: React.FC = () => {
  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const isLogin = useIsLogin()

  return (
    <>
      {userInfo && (
        <PopoverControl items={getLinks(i18n, userInfo, dispatch)}>
          <div className="app-header__menu-item">
            {userInfo.name}
            <Icon className="icon-middle" name="small-down" />
          </div>
        </PopoverControl>
      )}

      {!userInfo && !isLogin && (
        <Link key="admin-link" to={BasePaths.login} className="app-header__menu-item">
          {i18n.t('common.login')}
        </Link>
      )}
    </>
  )
}
export default LinksFRA

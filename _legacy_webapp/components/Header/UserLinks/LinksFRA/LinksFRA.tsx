import React from 'react'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { i18n } from 'i18next'

import { User, Users } from '@core/auth'
import * as BasePaths from '../../../../main/basePaths'
import { useI18n, useIsLogin } from '../../../../hooks'
import { UserActions, useUserInfo } from '../../../../store/user'

import Icon from '../../../../components/icon'
import PopoverControl, { PopoverItem } from '../../../../components/PopoverControl'
import { useAppDispatch } from '../../../../store'

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
      onClick: () => dispatch(UserActions.logout()),
    }
  )
  return items
}

const LinksFRA: React.FC = () => {
  const dispatch = useAppDispatch()
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

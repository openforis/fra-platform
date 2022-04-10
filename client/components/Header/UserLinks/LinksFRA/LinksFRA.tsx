import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { i18n } from 'i18next'

import { User, Users } from '@meta/user'

import { BasePaths } from '@client/basePaths'
import { useIsLogin } from '@client/hooks'

import Icon from '@client/components/Icon'
import PopoverControl, { PopoverItem } from '@client/components/PopoverControl'
import { AppDispatch, useAppDispatch } from '@client/store'
import { UserActions, useUser } from '@client/store/user'
import { useToaster, ToasterHook } from '@client/hooks/useToaster'

const getLinks = (i18nInstance: i18n, user: User, dispatch: AppDispatch, toaster: ToasterHook) => {
  const items: Array<PopoverItem> = [
    {
      content: i18nInstance.t('header.editProfile'),
      link: BasePaths.User.root(user.id),
    },
  ]
  if (Users.isAdministrator(user)) {
    items.push({
      content: i18nInstance.t('admin.admin'),
      link: BasePaths.Admin.root(),
    })
  }
  items.push(
    {
      divider: true,
    },
    {
      content: i18nInstance.t('header.logout'),
      onClick: () => {
        dispatch(UserActions.logout()).then(() => toaster.toaster.info(i18nInstance.t('login.logoutSuccessful')))
      },
    }
  )
  return items
}

const LinksFRA: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useUser()
  const toaster = useToaster()
  const { i18n } = useTranslation()
  const isLogin = useIsLogin()

  return (
    <>
      {user && (
        <PopoverControl items={getLinks(i18n, user, dispatch, toaster)}>
          <div className="app-header__menu-item">
            {user.name}
            <Icon className="icon-middle" name="small-down" />
          </div>
        </PopoverControl>
      )}

      {!user && !isLogin && (
        <Link key="admin-link" to={BasePaths.Login.root()} className="app-header__menu-item">
          {i18n.t('common.login')}
        </Link>
      )}
    </>
  )
}
export default LinksFRA

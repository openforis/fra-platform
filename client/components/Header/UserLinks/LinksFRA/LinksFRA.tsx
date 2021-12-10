import React from 'react'
import { Link } from 'react-router-dom'
import { i18n } from 'i18next'

import { User, Users } from '@core/meta/user'

import { BasePaths } from '@client/basePaths'
import { useIsLogin } from '@client/hooks'

import Icon from '@client/components/Icon'
import PopoverControl, { PopoverItem } from '@client/components/PopoverControl'
// import { useAppDispatch } from '@client/store'
import { useUser } from '@client/store/user'
import { useTranslation } from 'react-i18next'

const getLinks = (i18nInstance: i18n, user: User /* dispatch: Dispatch<any> */) => {
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
      // TODO: Handle user logout
      // onClick: () => dispatch(UserActions.logout()),
    }
  )
  return items
}

const LinksFRA: React.FC = () => {
  // const dispatch = useAppDispatch()
  const user = useUser()
  const { i18n } = useTranslation()
  const isLogin = useIsLogin()

  return (
    <>
      {user && (
        <PopoverControl items={getLinks(i18n, user /* dispatch */)}>
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

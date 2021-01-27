import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { isAdministrator } from '@common/countryRole'
import * as BasePaths from '@webapp/main/basePaths'
import { useI18n, useIsLogin, useUserInfo } from '@webapp/components/hooks'
import { PopoverControl } from '@webapp/components/popoverControl'
import Icon from '@webapp/components/icon'
import { logout } from '@webapp/store/user/actions'

const getLinks = (i18n: any, userInfo: any, dispatch: any) => {
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
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ divider: boolean; }' is not as... Remove this comment to see the full error message
      divider: true,
    },
    {
      content: i18n.t('header.logout'),
      onClick: () => dispatch(logout()),
    }
  )
  return items
}
const LinksFRA = () => {
  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const isLogin = useIsLogin()
  return (
    <>
      {userInfo && (
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; items: { content: any; ... Remove this comment to see the full error message
        <PopoverControl items={getLinks(i18n, userInfo, dispatch)}>
          <div className="app-header__menu-item">
            {(userInfo as any).name}
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; name: string; }' is not... Remove this comment to see the full error message */}
            <Icon className="icon-middle" name="small-down" />
          </div>
        </PopoverControl>
      )}

      {!userInfo && !isLogin && (
        <Link key="admin-link" to={BasePaths.login} className="app-header__menu-item">
          {(i18n as any).t('common.login')}
        </Link>
      )}
    </>
  )
}
export default LinksFRA

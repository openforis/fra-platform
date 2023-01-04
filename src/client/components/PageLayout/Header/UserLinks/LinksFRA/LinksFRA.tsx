import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { i18n } from 'i18next'

import { ClientRoutes } from '@meta/app'
import { Assessment, Cycle } from '@meta/assessment'
import { User, Users } from '@meta/user'

import { AppDispatch, useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { UserActions, useUser } from '@client/store/user'
import { useIsLogin } from '@client/hooks'
import { ToasterHook, useToaster } from '@client/hooks/useToaster'
import Icon from '@client/components/Icon'
import PopoverControl, { PopoverItem } from '@client/components/PopoverControl'

const getLinks = (
  i18nInstance: i18n,
  assessment: Assessment,
  cycle: Cycle,
  user: User,
  dispatch: AppDispatch,
  toaster: ToasterHook
) => {
  const items: Array<PopoverItem> = [
    {
      content: i18nInstance.t('header.editProfile'),
      link: ClientRoutes.Assessment.Cycle.Users.User.getLink({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        id: user.id,
      }),
    },
  ]
  if (Users.isAdministrator(user)) {
    items.push({
      content: i18nInstance.t('admin.admin'),
      link: ClientRoutes.Assessment.Cycle.Admin.Root.getLink({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
      }),
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
  const assessment = useAssessment()
  const cycle = useCycle()
  const dispatch = useAppDispatch()
  const user = useUser()
  const toaster = useToaster()
  const { i18n } = useTranslation()
  const isLogin = useIsLogin()

  return (
    <>
      {user && (
        <PopoverControl items={getLinks(i18n, assessment, cycle, user, dispatch, toaster)}>
          <div className="app-header__menu-item">
            {user.name}
            <Icon className="icon-middle" name="small-down" />
          </div>
        </PopoverControl>
      )}

      {!user && !isLogin && (
        <Link
          key="admin-link"
          to={ClientRoutes.Assessment.Cycle.Login.Root.getLink({
            assessmentName: assessment.props.name,
            cycleName: cycle.name,
          })}
          className="app-header__menu-item"
        >
          {i18n.t<string>('common.login')}
        </Link>
      )}
    </>
  )
}
export default LinksFRA

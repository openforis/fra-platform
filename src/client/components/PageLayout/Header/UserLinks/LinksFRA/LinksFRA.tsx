import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { TFunction } from 'i18next'

import { CountryIso, Global } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Routes } from 'meta/routes'
import { User, Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { AppDispatch, useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { UserActions, useUser } from 'client/store/user'
import { useCountryIso, useIsLoginRoute } from 'client/hooks'
import { ToasterHook, useToaster } from 'client/hooks/useToaster'
import Icon from 'client/components/Icon'
import PopoverControl, { PopoverItem } from 'client/components/PopoverControl'

const getLinks = (
  t: TFunction,
  assessment: Assessment,
  countryIso: CountryIso,
  cycle: Cycle,
  user: User,
  dispatch: AppDispatch,
  toaster: ToasterHook
) => {
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const userCountryIso = countryIso ?? UserRoles.getLastRole({ assessment, user })?.countryIso ?? Global.WO
  const items: Array<PopoverItem> = [
    {
      content: t<string>('header.editProfile'),
      link: Routes.CountryUser.generatePath({ assessmentName, cycleName, countryIso: userCountryIso, id: user.id }),
    },
  ]
  if (Users.isAdministrator(user)) {
    items.push({
      content: t<string>('admin.admin'),
      link: Routes.Admin.generatePath({ assessmentName, cycleName }),
    })
  }
  items.push(
    {
      divider: true,
    },
    {
      content: t<string>('header.logout'),
      onClick: () => {
        dispatch(UserActions.logout()).then(() => toaster.toaster.info(t('login.logoutSuccessful')))
      },
    }
  )
  return items
}

const LinksFRA: React.FC = () => {
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const dispatch = useAppDispatch()
  const user = useUser()
  const toaster = useToaster()

  const { t } = useTranslation()
  const isLogin = useIsLoginRoute()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return (
    <>
      {user && (
        <PopoverControl items={getLinks(t, assessment, countryIso, cycle, user, dispatch, toaster)}>
          <div className="app-header__menu-item">
            {Users.getFullName(user)}
            <Icon className="icon-middle" name="small-down" />
          </div>
        </PopoverControl>
      )}

      {!user && !isLogin && (
        <Link
          key="admin-link"
          to={Routes.Login.generatePath({ assessmentName, cycleName })}
          className="app-header__menu-item"
        >
          {t<string>('common.login')}
        </Link>
      )}
    </>
  )
}
export default LinksFRA

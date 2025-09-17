import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { Global } from 'meta/area'
import { Assessments } from 'meta/assessment/assessments'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAppDispatch } from 'client/store/hooks'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { UserActions } from 'client/store/user/actions'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryIso, useIsLoginRoute } from 'client/hooks'
import { useToaster } from 'client/hooks/useToaster'
import Icon from 'client/components/Icon'
import PopoverControl, { PopoverItem } from 'client/components/PopoverControl'

const useUserLinks = (): Array<PopoverItem> => {
  const { t } = useTranslation()
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const dispatch = useAppDispatch()
  const user = useUser()
  const toaster = useToaster()
  const navigate = useNavigate()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const userCountryIso = countryIso ?? UserRoles.getLastRole({ assessment, user })?.countryIso ?? Global.WO

  if (!user) return []

  const userProfileProps = { assessmentName, cycleName, countryIso: userCountryIso, id: String(user.id) }
  const items: Array<PopoverItem> = [
    {
      content: t<string>('header.editProfile'),
      link: Routes.CountryUser.generatePath(userProfileProps),
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
      onClick: async () => {
        await dispatch(UserActions.logout()).unwrap()
        toaster.toaster.info(t('login.logoutSuccessful'))
        const lastPublishedCycleName = Assessments.getLastPublishedCycle(assessment).name
        const path = Routes.Cycle.generatePath({ assessmentName, cycleName: lastPublishedCycleName })
        navigate(path)
      },
    }
  )

  return items
}

const LinksFRA: React.FC = () => {
  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()
  const isLogin = useIsLoginRoute()
  const userLinks = useUserLinks()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return (
    <>
      {user && (
        <PopoverControl items={userLinks}>
          <div className="app-header__menu-item">
            {Users.getFullName(user)}
            <Icon className="icon-middle" name="small-down" />
          </div>
        </PopoverControl>
      )}

      {!user && !isLogin && (
        <Link
          key="admin-link"
          className="app-header__menu-item"
          to={Routes.Login.generatePath({ assessmentName, cycleName })}
        >
          {t<string>('common.login')}
        </Link>
      )}
    </>
  )
}

export default LinksFRA

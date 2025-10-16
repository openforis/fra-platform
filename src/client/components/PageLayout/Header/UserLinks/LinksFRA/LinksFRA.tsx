import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useIsLoginRoute } from 'client/hooks/routes'
import Icon from 'client/components/Icon'
import PopoverControl from 'client/components/PopoverControl'

import { useUserLinks } from './hooks/useUserLinks'

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

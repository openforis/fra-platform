import './linkHome.scss'
import React, { useMemo } from 'react'
import { NavLink } from 'react-router'

import { Assessments } from 'meta/assessment/assessments'
import { Routes } from 'meta/routes/routes'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Icon from 'client/components/Icon'
import { IconName } from 'client/components/Icon/types'

const LinkHome: React.FC = () => {
  const assessment = useAssessment()
  const { assessmentName, cycleName: cycleNameParam } = useCountryRouteParams()
  const user = useUser()

  const cycleName = useMemo(
    () => (user ? cycleNameParam : Assessments.getLastPublishedCycle(assessment).name),
    [assessment, cycleNameParam, user]
  )

  if (!assessmentName || !cycleName) return null

  return (
    <NavLink className="app-header-link-home" end to={Routes.Cycle.generatePath({ assessmentName, cycleName })}>
      <Icon name={IconName.home} />
    </NavLink>
  )
}

export default LinkHome

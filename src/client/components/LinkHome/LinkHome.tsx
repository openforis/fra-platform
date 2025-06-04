import './linkHome.scss'
import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'

import { Assessments } from 'meta/assessment/assessments'
import { Routes } from 'meta/routes'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

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
      <Icon name="home" />
    </NavLink>
  )
}

export default LinkHome

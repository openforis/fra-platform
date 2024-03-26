import './linkHome.scss'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { Routes } from 'meta/routes'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

const LinkHome: React.FC = () => {
  const { assessmentName, cycleName } = useCountryRouteParams()

  if (!assessmentName || !cycleName) return null

  return (
    <NavLink className="app-header-link-home" end to={Routes.Cycle.generatePath({ assessmentName, cycleName })}>
      <Icon name="home" />
    </NavLink>
  )
}

export default LinkHome

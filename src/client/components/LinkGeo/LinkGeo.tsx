import './linkGeo.scss'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { Routes } from 'meta/routes'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

const LinkGeo: React.FC = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  return (
    <NavLink
      end
      to={Routes.Geo.generatePath({ assessmentName, cycleName, countryIso })}
      className="app-header-link-geo"
    >
      GEO
    </NavLink>
  )
}

export default LinkGeo

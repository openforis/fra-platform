import './linkGeo.scss'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { Routes } from 'meta/routes/routes'

import { useCountryRouteParams } from 'client/hooks/routeParams'

const LinkGeo: React.FC = () => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()

  return (
    <NavLink
      className="app-header-link-geo"
      end
      to={Routes.Geo.generatePath({ assessmentName, cycleName, countryIso })}
    >
      GEO
    </NavLink>
  )
}

export default LinkGeo

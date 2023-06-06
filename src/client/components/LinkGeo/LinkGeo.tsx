import './linkGeo.scss'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'

const LinkGeo: React.FC = () => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  return (
    <NavLink
      end
      to={ClientRoutes.Assessment.Cycle.Country.Geo.getLink({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        countryIso,
      })}
      className="app-header-link-geo"
    >
      GEO
    </NavLink>
  )
}

export default LinkGeo

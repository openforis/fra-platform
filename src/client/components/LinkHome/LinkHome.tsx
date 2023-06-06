import './linkHome.scss'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'

import { useAssessment, useCycle } from 'client/store/assessment'

const LinkHome: React.FC = () => {
  const assessment = useAssessment()
  const cycle = useCycle()

  if (!assessment || !cycle) return null

  return (
    <NavLink
      end
      to={ClientRoutes.Assessment.Cycle.Landing.getLink({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
      })}
      className="app-header-link-home"
    >
      <svg id="Home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.789 35.773">
        <path
          id="Path_207"
          data-name="Path 207"
          d="M1802.371,100.83h-9.222l.036-11.215-9.36.054.026,11.161h-9.185V84.255l13.855-12.145,13.85,12.145Z"
          transform="translate(-1767.102 -65.057)"
          fill="currentColor"
        />
        <path
          id="Path_208"
          data-name="Path 208"
          d="M1659.947,6.649h-4.6L1676.73-12l.026,4.124Z"
          transform="translate(-1655.348 12)"
          fill="currentColor"
        />
        <path
          id="Path_209"
          data-name="Path 209"
          d="M2009.411,6.649h4.6L1992.6-12l.025,4.124Z"
          transform="translate(-1971.223 12)"
          fill="currentColor"
        />
      </svg>
    </NavLink>
  )
}

export default LinkHome

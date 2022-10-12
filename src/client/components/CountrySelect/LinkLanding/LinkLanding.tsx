import './linkLanding.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath, NavLink, useLocation } from 'react-router-dom'

import classNames from 'classnames'

import { ClientRoutes } from '@meta/app'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'

const LinkLanding: React.FC = () => {
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const { pathname } = useLocation()

  if (!assessment || !cycle) return null

  return (
    <NavLink
      to={ClientRoutes.Assessment.Root.getLink({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
      })}
      className={() => {
        return classNames('country-selection-link-landing', {
          selected: matchPath({ path: ClientRoutes.Assessment.Home.Root.path.absolute, end: false }, pathname),
        })
      }}
    >
      <Icon name="icon-bar-chart" className="icon-sub icon-margin-right" />
      <div className="nav__link-label">{i18n.t<string>(`area.${countryIso}.listName`)}</div>
    </NavLink>
  )
}
export default LinkLanding

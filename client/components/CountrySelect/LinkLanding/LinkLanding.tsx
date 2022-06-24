import './linkLanding.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useMatch } from 'react-router-dom'

import classNames from 'classnames'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'
import { ClientRoutes } from '@client/clientRoutes'
import Icon from '@client/components/Icon'

const LinkLanding: React.FC = () => {
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  if (!assessment || !cycle) return null

  return (
    <NavLink
      to={ClientRoutes.Assessment.root.getAbsolutePath({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
      })}
      className={() => {
        return classNames('country-selection-link-landing', {
          selected: useMatch(ClientRoutes.Assessment.Home.root.absolutePath),
        })
      }}
    >
      <Icon name="icon-bar-chart" className="icon-sub icon-margin-right" />
      <div className="nav__link-label">{i18n.t<string>(`area.${countryIso}.listName`)}</div>
    </NavLink>
  )
}
export default LinkLanding

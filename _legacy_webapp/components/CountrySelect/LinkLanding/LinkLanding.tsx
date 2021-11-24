import './linkLanding.scss'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import * as BasePaths from '../../../main/basePaths'
import { useAssessmentType } from '../../../store/app'
import { useCountryIso, useI18n, useCountryLandingSections } from '../../../hooks'

import Icon from '../../../components/icon'

const LinkLanding: React.FC = () => {
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const location = useLocation()
  const sections = useCountryLandingSections()
  const assessmentType = useAssessmentType()

  const isActive = (match: any) =>
    match && (match.isExact || sections.find((section: any) => location.pathname.indexOf(section.name) > 0))

  return (
    <NavLink
      to={BasePaths.getAssessmentHomeLink(countryIso, assessmentType)}
      className="country-selection-link-landing"
      activeClassName="selected"
      isActive={isActive}
    >
      <Icon name="icon-bar-chart" className="icon-sub icon-margin-right" />
      <div className="nav__link-label">{i18n.t(`area.${countryIso}.listName`)}</div>
    </NavLink>
  )
}
export default LinkLanding

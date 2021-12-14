import './linkLanding.scss'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { useCountryIso, useCountryLandingSections } from '@client/hooks'

import Icon from '@client/components/Icon'
import { BasePaths } from '@client/basePaths'
import { useAssessment } from '@client/store/assessment'
import { useTranslation } from 'react-i18next'

const LinkLanding: React.FC = () => {
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const location = useLocation()
  const sections = useCountryLandingSections()
  const assessment = useAssessment()
  const assessmentType = assessment.props.name

  const isActive = (match: any) =>
    match && (match.isExact || sections.find((section: any) => location.pathname.indexOf(section.name) > 0))

  return (
    <NavLink
      to={BasePaths.Assessment.root(countryIso, assessmentType)}
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

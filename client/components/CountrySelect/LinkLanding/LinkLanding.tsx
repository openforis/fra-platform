import './linkLanding.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso, useCountryLandingSections } from '@client/hooks'
import { BasePaths } from '@client/basePaths'
import Icon from '@client/components/Icon'

const LinkLanding: React.FC = () => {
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const location = useLocation()
  const sections = useCountryLandingSections()
  const assessment = useAssessment()
  const cycle = useCycle()
  const assessmentType = assessment?.props?.name

  const isActive = (match: any) =>
    match && (match.isExact || sections.find((section: any) => location.pathname.indexOf(section?.name) > 0))

  return (
    <NavLink
      to={BasePaths.Assessment.root(countryIso, assessmentType, cycle?.name)}
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

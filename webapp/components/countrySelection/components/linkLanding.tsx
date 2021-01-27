import './linkLanding.less'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import * as BasePaths from '@webapp/main/basePaths'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import useCountryLandingSections from '@webapp/app/countryLanding/useCountryLandingSections'
import Icon from '@webapp/components/icon'
import { useAssessmentType } from '@webapp/store/app'

const LinkLanding = () => {
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const location = useLocation()
  const sections = useCountryLandingSections()
  const assessmentType = useAssessmentType()
  const isActive = (match: any) =>
    match && (match.isExact || sections.find((section) => location.pathname.indexOf(section.name) > 0))
  return (
    <NavLink
      to={BasePaths.getAssessmentHomeLink(countryIso, assessmentType)}
      className="country-selection-link-landing"
      activeClassName="selected"
      isActive={isActive}
    >
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: string; className: string; }' is not... Remove this comment to see the full error message */}
      <Icon name="icon-bar-chart" className="icon-sub icon-margin-right" />
      <div className="nav__link-label">{(i18n as any).t(`area.${countryIso}.listName`)}</div>
    </NavLink>
  )
}
export default LinkLanding

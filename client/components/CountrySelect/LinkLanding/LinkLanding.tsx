import './linkLanding.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'
import { BasePaths } from '@client/basePaths'
import Icon from '@client/components/Icon'

const LinkLanding: React.FC = () => {
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const assessmentType = assessment?.props?.name

  return (
    <NavLink
      to={BasePaths.Assessment.root(countryIso, assessmentType, cycle?.name)}
      className="country-selection-link-landing"
    >
      <Icon name="icon-bar-chart" className="icon-sub icon-margin-right" />
      <div className="nav__link-label">{i18n.t<string>(`area.${countryIso}.listName`)}</div>
    </NavLink>
  )
}
export default LinkLanding

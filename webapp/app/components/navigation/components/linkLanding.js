import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useCountryLandingSections from '@webapp/app/countryLanding/useCountryLandingSections'

import * as BasePaths from '@webapp/main/basePaths'

const LinkLanding = () => {
  const i18n = useI18n()

  const countryIso = useCountryIso()
  const location = useLocation()
  const sections = useCountryLandingSections()

  const isActive = (match) =>
    match && (match.isExact || sections.find((section) => location.pathname.indexOf(section.name) > 0))

  return (
    <NavLink
      className="nav__link"
      to={BasePaths.getCountryHomeLink(countryIso)}
      activeClassName="selected"
      isActive={isActive}
    >
      <div className="nav__link-label">{i18n.t('landing.home')}</div>
    </NavLink>
  )
}

export default LinkLanding

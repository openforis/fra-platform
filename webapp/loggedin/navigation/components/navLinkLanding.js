import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useLandingViewSections from '@webapp/landing/useLandingViewSections'

const NavLinkLanding = () => {

  const i18n = useI18n()
  const countryIso = useCountryIso()
  const location = useLocation()
  const sections = useLandingViewSections()

  const isActive = match => match &&
    (match.isExact || sections.find(section => location.pathname.indexOf(section.name) > 0))

  return (
    <NavLink
      className="nav__link"
      to={`/country/${countryIso}/`}
      activeClassName="selected"
      isActive={isActive}>
      <div className='nav__link-label'>
        {i18n.t('landing.home')}
      </div>
    </NavLink>
  )

}

export default NavLinkLanding

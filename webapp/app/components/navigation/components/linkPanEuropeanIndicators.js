import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import * as Country from '@common/country/country'

import { useCountryIso, useI18n, useUserInfo } from '@webapp/components/hooks'

import * as CountryState from '@webapp/app/country/countryState'

const LinkPanEuropeanIndicators = () => {
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const country = useSelector(CountryState.getCountryByCountryIso(countryIso))

  if (!country || !Country.isPanEuropean(country) || !userInfo) {
    return null
  }

  return (
    <>
      <div className="nav__divider" />
      <NavLink
        className="nav__link"
        to={`/country/${countryIso}/panEuropeanIndicators/`}
        activeClassName="selected"
        exact
      >
        <div className="nav__link-label">{i18n.t('navigation.sectionHeaders.panEuropeanIndicators')}</div>
      </NavLink>
    </>
  )
}

export default LinkPanEuropeanIndicators

import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import * as Country from '@common/country/country'

import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

import * as CountryState from '@webapp/app/country/countryState'

const LinkPanEuropeanIndicators = () => {

  const countryIso = useCountryIso()
  const i18n = useI18n()
  const country = useSelector(CountryState.getCountryByCountryIso(countryIso))

  if (!Country.isPanEuropean(country)) {
    return null
  }

  return (
    <>
      <div className="nav__divider"/>
      <NavLink
        className="nav__link"
        to={`/country/${countryIso}/panEuropeanIndicators/`}
        activeClassName="selected"
        exact={true}>
        <div className='nav__link-label'>
          {i18n.t('navigation.sectionHeaders.panEuropeanIndicators')}
        </div>
      </NavLink>
    </>
  )
}

export default LinkPanEuropeanIndicators

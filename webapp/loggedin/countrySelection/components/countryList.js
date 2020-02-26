import './countryList.less'

import React from 'react'
import { useSelector } from 'react-redux'

import CountryListRoleSection from '@webapp/loggedin/countrySelection/components/countryListRoleSection'
import CountryListDownload from '@webapp/loggedin/countrySelection/components/countryListDownload'

import * as CountryState from '@webapp/country/countryState'

const CountryList = () => {
  const countries = useSelector(CountryState.getCountries)

  return (
    <div className="country-selection-list">
      <CountryListDownload/>

      <div className="country-selection-list__content">
        {
          Object.keys(countries).map(role =>
            <CountryListRoleSection
              key={role}
              role={role}
              roleCountries={countries[role]}
            />
          )
        }
      </div>
    </div>
  )
}

export default CountryList

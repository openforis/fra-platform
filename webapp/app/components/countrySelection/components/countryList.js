import './countryList.less'

import React from 'react'
import { useSelector } from 'react-redux'

import { Area } from '@common/country'
import { noRole } from '@common/countryRole'
import * as CountryState from '@webapp/app/country/countryState'

import CountryListDownload from './countryListDownload'
import CountryListRoleSection from './countryListRoleSection'
import CountryListRow from './countryListRow'

const CountryList = () => {
  const countries = useSelector(CountryState.getCountries)

  return (
    <div className="country-selection-list">
      <CountryListDownload />

      <div className="country-selection-list__content">
        <div className="country-selection-list__global">
          <CountryListRow role={noRole.role} country={{ countryIso: Area.levels.global }} />
          <hr />
          {Area.levels.regions.map((region) => (
            <CountryListRow key={region} role={noRole.role} country={{ countryIso: region }} />
          ))}
          <hr />
        </div>

        {Object.keys(countries).map((role) => (
          <CountryListRoleSection key={role} role={role} roleCountries={countries[role]} />
        ))}
      </div>
    </div>
  )
}

export default CountryList

import React from 'react'
import * as R from 'ramda'

import CountryListRow from '@webapp/loggedin/countrySelection/components/countryListRow'

import { getRoleLabelKey } from '@common/countryRole'

const CountryListRoleSection = ({ role, roleCountries, currentCountry, i18n, ...props }) =>
  <div className="nav__country-list-section">
    <div className="nav__country-list-header">
      <span className="nav__country-list-primary-col">{i18n.t(getRoleLabelKey(role))}</span>
      <span className="nav__country-list-secondary-col">{i18n.t('countryListing.fra2020')}</span>
      <span className="nav__country-list-secondary-col">{i18n.t('audit.edited')}</span>
    </div>
    {
      R.map(country =>
          <CountryListRow
            {...props}
            key={country.countryIso}
            country={country}
            i18n={i18n}
            selectedCountry={currentCountry}
          />
        , roleCountries)
    }
  </div>

export default CountryListRoleSection

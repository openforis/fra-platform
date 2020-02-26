import React from 'react'
import PropTypes from 'prop-types'

import { getRoleLabelKey } from '@common/countryRole'

import CountryListRow from '@webapp/loggedin/countrySelection/components/countryListRow'
import useI18n from '@webapp/components/hooks/useI18n'

const CountryListRoleSection = props => {
  const { role, roleCountries } = props
  const i18n = useI18n()

  return (

    <div className="nav__country-list-section">
      <div className="nav__country-list-header">
        <span className="nav__country-list-primary-col">{i18n.t(getRoleLabelKey(role))}</span>
        <span className="nav__country-list-secondary-col">{i18n.t('countryListing.fra2020')}</span>
        <span className="nav__country-list-secondary-col">{i18n.t('audit.edited')}</span>
      </div>
      {
        roleCountries.map((country, i) =>
          <CountryListRow
            key={i}
            country={country}
          />
        )
      }
    </div>
  )
}

CountryListRoleSection.propTypes = {
  role: PropTypes.string.isRequired,
  roleCountries: PropTypes.array.isRequired,
}

export default CountryListRoleSection

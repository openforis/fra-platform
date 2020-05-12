import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import { getRoleLabelKey, noRole } from '@common/countryRole'

import CountryListRow from '@webapp/app/components/countrySelection/components/countryListRow'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const CountryListRoleSection = props => {
  const { role, roleCountries } = props
  const i18n = useI18n()
  const userInfo = useUserInfo()

  const isCountryAtlantis = R.pipe(
    R.prop('countryIso'),
    R.startsWith('X'),
  )

  return (

    <div className="country-selection-list__section">
      {
        role !== noRole.role &&
        <div className="country-selection-list__header">
          <span className="country-selection-list__primary-col">{i18n.t(getRoleLabelKey(role))}</span>
          <span className="country-selection-list__secondary-col">{i18n.t('countryListing.fra2020')}</span>
          <span className="country-selection-list__secondary-col">{i18n.t('audit.edited')}</span>
        </div>
      }

      {
        roleCountries.map((country, i) =>
          // Atlantis countries are hidden in public view
          (userInfo || (!userInfo && !isCountryAtlantis(country))) &&
          <CountryListRow
            key={i}
            role={role}
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

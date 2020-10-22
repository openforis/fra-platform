import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import * as Fra from '@common/assessment/fra'
import { Area, Country } from '@common/country'
import { getRoleLabelKey, noRole } from '@common/countryRole'

import CountryListRow from '@webapp/components/countrySelection/components/countryListRow'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import { checkMatch } from '@webapp/components/countrySelection/utils/checkMatch'

const CountryListRoleSection = (props) => {
  const { role, roleCountries, query } = props
  const i18n = useI18n()
  const userInfo = useUserInfo()

  const isCountryAtlantis = R.pipe(Country.getCountryIso, R.startsWith('X'))

  // Atlantis countries are hidden in public view
  const countryListNameMatch = (country) => checkMatch(Area.getListName(Country.getCountryIso(country), i18n), query)
  const countryRegionCodeMatch = (country) =>
    Country.getRegionCodes(country)
      .map((regionCode) => checkMatch(i18n.t(`area.${regionCode}.listName`), query))
      .some(Boolean)

  const renderRow = (country) =>
    (userInfo || !isCountryAtlantis(country)) && (countryListNameMatch(country) || countryRegionCodeMatch(country))

  return (
    <div className="country-selection-list__section">
      {role !== noRole.role && (
        <div className="country-selection-list__header">
          <span className="country-selection-list__primary-col">{i18n.t(getRoleLabelKey(role))}</span>
          <span className="country-selection-list__secondary-col">{i18n.t('countryListing.fra2020')}</span>
          <span className="country-selection-list__secondary-col">{i18n.t('audit.edited')}</span>
        </div>
      )}

      {roleCountries.map(
        (country) =>
          renderRow(country) && (
            <CountryListRow
              key={Country.getCountryIso(country)}
              assessmentType={Fra.type}
              role={role}
              country={country}
            />
          )
      )}
    </div>
  )
}

CountryListRoleSection.defaultProps = {
  query: '',
}

CountryListRoleSection.propTypes = {
  role: PropTypes.string.isRequired,
  query: PropTypes.string,
  roleCountries: PropTypes.array.isRequired,
}

export default CountryListRoleSection

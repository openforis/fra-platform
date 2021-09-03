import React from 'react'

import { FRA } from '@core/assessment'
import { Areas, Country, RegionCode } from '@core/country'
import { getRoleLabelKey, noRole } from '@common/countryRole'
import { useI18n, useUserInfo } from '@webapp/components/hooks'

import { checkMatch } from '../../utils/checkMatch'
import CountryListRow from '../CountryListRow'

type Props = {
  role: string
  query?: string
  roleCountries: any[]
}

const CountryListRoleSection: React.FC<Props> = (props: Props) => {
  const { role, roleCountries, query } = props
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const isCountryAtlantis = (country: Country) => country.countryIso[0].toLowerCase() === 'x'
  // Atlantis countries are hidden in public view
  const countryListNameMatch = (country: Country) => checkMatch(Areas.getListName(country.countryIso, i18n), query)

  const countryRegionCodeMatch = (country: Country) =>
    country.regionCodes
      .map((regionCode: RegionCode) => checkMatch(i18n.t(`area.${regionCode}.listName`), query))
      .some(Boolean)

  const renderRow = (country: Country) =>
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
        (country: Country) =>
          renderRow(country) && (
            <CountryListRow key={country.countryIso} assessmentType={FRA.type} role={role} country={country} />
          )
      )}
    </div>
  )
}

CountryListRoleSection.defaultProps = {
  query: '',
}

export default CountryListRoleSection

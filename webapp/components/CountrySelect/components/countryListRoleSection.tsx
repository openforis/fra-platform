import React from 'react'
import * as R from 'ramda'
import FRA from '@common/assessment/fra'
import { Area, Country } from '@common/country'
import { getRoleLabelKey, noRole } from '@common/countryRole'
import CountryListRow from '@webapp/components/CountrySelect/components/countryListRow'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import { checkMatch } from '@webapp/components/CountrySelect/utils/checkMatch'

type Props = {
  role: string
  query?: string
  roleCountries: any[]
}

const CountryListRoleSection = (props: Props) => {
  const { role, roleCountries, query } = props
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const isCountryAtlantis = R.pipe(Country.getCountryIso, R.startsWith('X'))
  // Atlantis countries are hidden in public view
  const countryListNameMatch = (country: any) =>
    checkMatch(Area.getListName(Country.getCountryIso(country), i18n), query)
  const countryRegionCodeMatch = (country: any) =>
    (Country.getRegionCodes(country) as any[])
      .map((regionCode: any) => checkMatch((i18n as any).t(`area.${regionCode}.listName`), query))
      .some(Boolean)
  const renderRow = (country: any) =>
    (userInfo || !isCountryAtlantis(country)) && (countryListNameMatch(country) || countryRegionCodeMatch(country))
  return (
    <div className="country-selection-list__section">
      {role !== noRole.role && (
        <div className="country-selection-list__header">
          <span className="country-selection-list__primary-col">{(i18n as any).t(getRoleLabelKey(role))}</span>
          <span className="country-selection-list__secondary-col">{(i18n as any).t('countryListing.fra2020')}</span>
          <span className="country-selection-list__secondary-col">{(i18n as any).t('audit.edited')}</span>
        </div>
      )}

      {roleCountries.map(
        (country: any) =>
          renderRow(country) && (
            <CountryListRow
              key={Country.getCountryIso(country)}
              assessmentType={FRA.type}
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
export default CountryListRoleSection

import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as Fra from '@common/assessment/fra'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { Area, Country } from '@common/country'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { getRoleLabelKey, noRole } from '@common/countryRole'
import CountryListRow from '@webapp/components/countrySelection/components/countryListRow'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import { checkMatch } from '@webapp/components/countrySelection/utils/checkMatch'

type OwnProps = {
  role: string
  query?: string
  roleCountries: any[]
}
// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof CountryListRoleSection.defaultProps
// @ts-expect-error ts-migrate(7022) FIXME: 'CountryListRoleSection' implicitly has type 'any'... Remove this comment to see the full error message
const CountryListRoleSection = (props: Props) => {
  const { role, roleCountries, query } = props
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const isCountryAtlantis = R.pipe(Country.getCountryIso, R.startsWith('X'))
  // Atlantis countries are hidden in public view
  const countryListNameMatch = (country: any) =>
    checkMatch(Area.getListName(Country.getCountryIso(country), i18n), query)
  const countryRegionCodeMatch = (country: any) =>
    Country.getRegionCodes(country)
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
export default CountryListRoleSection

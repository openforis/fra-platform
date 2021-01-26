import React from 'react'
import PropTypes from 'prop-types'

import * as Fra from '@common/assessment/fra'
import { Area } from '@common/country'
import { noRole } from '@common/countryRole'
import { checkMatch } from '@webapp/components/countrySelection/utils/checkMatch'

import { useI18n } from '@webapp/components/hooks'
import { useCountries } from '@webapp/store/app'
import { useUserCountries } from '@webapp/store/user'

import { useGroupedRegions } from '@webapp/store/app/hooks'
import CountryListDownload from '../countryListDownload'
import CountryListRow from '../countryListRow'
import CountryListRoleSection from '../countryListRoleSection'

const CountryListFra = (props) => {
  const { query } = props
  const i18n = useI18n()

  const allCountries = useCountries()

  const groupedRegions = useGroupedRegions()
  const userCountries = useUserCountries()

  const filterRegions = (regions) =>
    regions
      .filter((region) => checkMatch(Area.getListName(region.regionCode, i18n), query))
      .filter((region) => region.regionCode !== Area.levels.forest_europe)

  const userCountryIsos = []

  Object.keys(userCountries).forEach((role) => {
    if (Array.isArray(userCountries[role]))
      userCountries[role].forEach((country) => userCountryIsos.push(country.countryIso))
  })

  const countryMap = {
    ...userCountries,
    [noRole.role]: allCountries.filter((country) => !userCountryIsos.includes(country.countryIso)),
  }

  return (
    <div className="country-selection-list">
      <CountryListDownload />

      <div className="country-selection-list__content">
        <div className="country-selection-list__global">
          {checkMatch(i18n.t(`area.${Area.levels.global}.listName`), query) && (
            <>
              <CountryListRow
                role={noRole.role}
                country={{ countryIso: Area.levels.global }}
                assessmentType={Fra.type}
              />
              <hr />
            </>
          )}
          {groupedRegions.map(({ regions, name }) => (
            <div key={name}>
              {filterRegions(regions).map(({ regionCode }) => (
                <CountryListRow
                  key={regionCode}
                  role={noRole.role}
                  country={{ countryIso: regionCode }}
                  assessmentType={Fra.type}
                />
              ))}
              {filterRegions(regions).length > 0 && <hr />}
            </div>
          ))}
        </div>

        {Object.keys(countryMap).map((role) => (
          <CountryListRoleSection key={role} role={role} roleCountries={countryMap[role]} query={query} />
        ))}
      </div>
    </div>
  )
}

CountryListFra.propTypes = {
  query: PropTypes.string.isRequired,
}

export default CountryListFra

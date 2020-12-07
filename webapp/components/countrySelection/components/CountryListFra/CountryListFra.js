import React from 'react'
import PropTypes from 'prop-types'

import * as Fra from '@common/assessment/fra'
import { Area } from '@common/country'
import { noRole } from '@common/countryRole'
import { checkMatch } from '@webapp/components/countrySelection/utils/checkMatch'

import { useI18n } from '@webapp/components/hooks'
import { useRegions, useCountries } from '@webapp/store/app'
import { useUserCountries } from '@webapp/store/user'

import CountryListDownload from '../countryListDownload'
import CountryListRow from '../countryListRow'
import CountryListRoleSection from '../countryListRoleSection'

const CountryListFra = (props) => {
  const { query } = props
  const i18n = useI18n()

  const allCountries = useCountries()

  const regions = useRegions()
  const userCountries = useUserCountries()

  const filteredRegions = regions
    .filter((region) => checkMatch(Area.getListName(region, i18n), query))
    .filter((region) => region !== Area.levels.forest_europe)

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
          {filteredRegions.map((region) => (
            <CountryListRow
              key={region}
              role={noRole.role}
              country={{ countryIso: region }}
              assessmentType={Fra.type}
            />
          ))}
          {filteredRegions.length > 0 && <hr />}
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

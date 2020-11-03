import React from 'react'
import PropTypes from 'prop-types'

import * as Fra from '@common/assessment/fra'
import { Area } from '@common/country'
import { noRole } from '@common/countryRole'
import { checkMatch } from '@webapp/components/countrySelection/utils/checkMatch'

import { useI18n } from '@webapp/components/hooks'
import { useRegions } from '@webapp/store/app'
import { useCountries } from '@webapp/store/country/hooks/useCountries'

import CountryListDownload from '../countryListDownload'
import CountryListRow from '../countryListRow'
import CountryListRoleSection from '../countryListRoleSection'

const CountryListFra = (props) => {
  const { query } = props
  const countries = useCountries()
  const i18n = useI18n()

  const regions = useRegions()
  const filteredRegions = regions.filter((region) => checkMatch(Area.getListName(region, i18n), query))

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

        {Object.keys(countries).map((role) => (
          <CountryListRoleSection key={role} role={role} roleCountries={countries[role]} query={query} />
        ))}
      </div>
    </div>
  )
}

CountryListFra.propTypes = {
  query: PropTypes.string.isRequired,
}

export default CountryListFra

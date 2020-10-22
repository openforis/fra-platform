import React from 'react'
import PropTypes from 'prop-types'

import * as PanEuropean from '@common/assessment/panEuropean'
import { Area, Country } from '@common/country'
import { noRole } from '@common/countryRole'
import { checkMatch } from '@webapp/components/countrySelection/utils/checkMatch'

import { useCountriesPanEuropean } from '@webapp/store/app'

import { useI18n } from '@webapp/components/hooks'

import CountryListRow from '../countryListRow'

const CountryListPanEuropean = (props) => {
  const { query } = props

  const i18n = useI18n()
  const countries = useCountriesPanEuropean()
  const countriesFiltered = countries.filter((country) =>
    checkMatch(Area.getListName(Country.getCountryIso(country), i18n), query)
  )

  return (
    <div className="country-selection-list">
      <div className="country-selection-list__content">
        <div className="country-selection-list__global">
          <CountryListRow
            role={noRole.role}
            country={{ countryIso: Area.levels.europe }}
            assessmentType={PanEuropean.type}
          />
          <hr />
        </div>

        {countriesFiltered.map((country) => (
          <CountryListRow
            key={Country.getCountryIso(country)}
            role={noRole.role}
            country={country}
            assessmentType={PanEuropean.type}
          />
        ))}
      </div>
    </div>
  )
}

CountryListPanEuropean.propTypes = {
  query: PropTypes.string.isRequired,
}

export default CountryListPanEuropean

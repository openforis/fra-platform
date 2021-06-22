import React from 'react'

import PanEuropean from '@common/assessment/panEuropean'
import { Area, Country } from '@common/country'
import { noRole } from '@common/countryRole'
import { checkMatch } from '@webapp/components/CountrySelect/utils/checkMatch'

import { useCountriesPanEuropean } from '@webapp/store/app'

import { useI18n } from '@webapp/components/hooks'

import CountryListRow from '../countryListRow'

type Props = {
  query: string
}

const CountryListPanEuropean = (props: Props) => {
  const { query } = props

  const i18n = useI18n()
  const countries = useCountriesPanEuropean()
  const countriesFiltered = countries.filter((country: any) =>
    checkMatch(Area.getListName(Country.getCountryIso(country), i18n), query)
  )

  return (
    <div className="country-selection-list">
      <div className="country-selection-list__content">
        <div className="country-selection-list__global">
          <CountryListRow
            role={noRole.role}
            country={{ countryIso: Area.levels.forest_europe }}
            assessmentType={PanEuropean.type}
          />
          <hr />
        </div>

        {countriesFiltered.map((country: any) => (
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

export default CountryListPanEuropean

import React from 'react'

import { PanEuropean } from '@core/assessment'
import { Areas, RegionCode } from '@core/country'
import { noRole } from '@common/countryRole'

import { useCountriesPanEuropean } from '@webapp/store/app'
import { useI18n } from '@webapp/components/hooks'
import { checkMatch } from '../../utils/checkMatch'

import CountryListRow from '../CountryListRow'

type Props = {
  query: string
}

const CountryListPanEuropean: React.FC<Props> = (props: Props) => {
  const { query } = props

  const i18n = useI18n()
  const countries = useCountriesPanEuropean()
  const countriesFiltered = countries.filter((country) =>
    checkMatch(Areas.getListName(country.countryIso, i18n), query)
  )

  return (
    <div className="country-selection-list">
      <div className="country-selection-list__content">
        <div className="country-selection-list__global">
          <CountryListRow
            role={noRole.role}
            country={{ countryIso: RegionCode.FE }}
            assessmentType={PanEuropean.type}
          />
          <hr />
        </div>

        {countriesFiltered.map((country) => (
          <CountryListRow
            key={country.countryIso}
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

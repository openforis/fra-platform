import React from 'react'

import { Areas } from '@core/country'
import { Objects } from '@core/utils'
import { useHomeCountriesFilter } from '../../../../store/page/home'
import { useI18n } from '../../../../hooks'

const SelectedCountries: React.FC = () => {
  const i18n = useI18n()
  const countriesFilter = useHomeCountriesFilter()

  if (Objects.isEmpty(countriesFilter)) {
    return null
  }

  return (
    <>
      {countriesFilter.map((countryIso: string) => (
        <span key={countryIso} className="landng__page-country-label">
          {Areas.getListName(countryIso, i18n)}
        </span>
      ))}
    </>
  )
}
export default SelectedCountries

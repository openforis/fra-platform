import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Areas, CountryIso } from 'meta/area'

import { useHomeCountriesFilter } from 'client/store/ui/home'

const SelectedCountries: React.FC = () => {
  const { i18n } = useTranslation()
  const countriesFilter = useHomeCountriesFilter()

  if (Objects.isEmpty(countriesFilter)) {
    return null
  }

  return (
    <>
      {countriesFilter.map((countryIso: CountryIso) => (
        <span key={countryIso} className="landng__page-country-label">
          {i18n.t<string>(Areas.getTranslationKey(countryIso))}
        </span>
      ))}
    </>
  )
}

export default SelectedCountries

import React from 'react'
import { useSelector } from 'react-redux'
import { HomeState } from '@webapp/store/ui'
import Area from '@common/country/area'
import useI18n from '@webapp/components/hooks/useI18n'

const SelectedCountries = () => {
  const i18n = useI18n()
  const selectedCountries = useSelector(HomeState.getSelectedCountries)

  if (!selectedCountries || selectedCountries.length === 0) {
    return null
  }

  return (
    <>
      {selectedCountries.map((countryIso) => (
        <span key={countryIso} className="landng__page-country-label">
          {Area.getListName(countryIso, i18n)}
        </span>
      ))}
    </>
  )
}

export default SelectedCountries

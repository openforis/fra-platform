import React from 'react'
import { useSelector } from 'react-redux'
import { UiState } from '@webapp/store/ui'
import Area from '@common/country/area'
import useI18n from '@webapp/components/hooks/useI18n'

const SelectedCountries = () => {
  const i18n = useI18n()
  const selectedCountries = useSelector(UiState.getSelectedCountries)

  if (!selectedCountries || selectedCountries.length === 0) {
    return null
  }

  return (
    <h2 className="landing__page-subtitle">
      Filter:
      {selectedCountries.map((countryIso) => (
        <span className="landng__page-country-label">{Area.getListName(countryIso, i18n)}</span>
      ))}
    </h2>
  )
}

export default SelectedCountries

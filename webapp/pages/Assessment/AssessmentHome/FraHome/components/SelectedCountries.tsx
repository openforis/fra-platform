import React from 'react'
import { useSelector } from 'react-redux'
import Area from '@common/country/area'
import useI18n from '@webapp/components/hooks/useI18n'
import * as UiState from '@webapp/store/ui/state'

const SelectedCountries = () => {
  const i18n = useI18n()
  const selectedCountries: any = useSelector(UiState.getSelectedCountries)
  if (!selectedCountries || selectedCountries.length === 0) {
    return null
  }
  return (
    <>
      {selectedCountries.map((countryIso: string) => (
        <span key={countryIso} className="landng__page-country-label">
          {Area.getListName(countryIso, i18n)}
        </span>
      ))}
    </>
  )
}
export default SelectedCountries

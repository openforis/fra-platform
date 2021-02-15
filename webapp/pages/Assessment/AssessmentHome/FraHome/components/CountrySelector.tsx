import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import CountrySelectionModal from '@webapp/components/CountrySelectionModal'
import { useCountries } from '@webapp/store/app'
import { useI18n } from '@webapp/components/hooks'
import { HomeActions } from '@webapp/store/ui'
import { useSecondaryGroupedRegions } from '@webapp/store/app/hooks'
export const __MIN_COUNTRIES__ = 9
const CountrySelector = () => {
  const dispatch = useDispatch()
  const countries: any = useCountries()
  const secondaryRegions = useSecondaryGroupedRegions()
  const [modalOpen, setModalOpen] = useState(false)
  const i18n = useI18n()
  const onClose = (selectedCountries: any) => {
    if (selectedCountries.length >= __MIN_COUNTRIES__) {
      dispatch(HomeActions.updateSelectedCountries(selectedCountries))
    } else {
      dispatch(HomeActions.updateSelectedCountries([]))
    }
    setModalOpen(false)
  }
  const canSave = (selectedCountries: any[]) => selectedCountries.length >= __MIN_COUNTRIES__
  return (
    <div className="country-selector">
      <CountrySelectionModal
        isOpen={modalOpen}
        countries={countries}
        headerLabel={i18n.t('common.select')}
        onClose={onClose}
        canSave={canSave}
        excludedRegions={secondaryRegions.regions.map((r: any) => r.regionCode)}
        showCount
      />
      <button onClick={() => setModalOpen(true)} className="btn-s btn btn-primary filter-countries">
        {i18n.t('common.filterCountries')}
      </button>
    </div>
  )
}
export default CountrySelector

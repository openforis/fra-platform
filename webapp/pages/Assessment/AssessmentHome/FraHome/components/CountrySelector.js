import './style.less'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import CountrySelectionModal from '@webapp/components/CountrySelectionModal'
import { useCountries } from '@webapp/store/app'
import { useI18n } from '@webapp/components/hooks'
import { UiActions } from '@webapp/store/ui'

export const __MIN_COUNTRIES__ = 9

const CountrySelector = () => {
  const dispatch = useDispatch()
  const countries = useCountries()
  const [modalOpen, setModalOpen] = useState(false)
  const i18n = useI18n()

  const onClose = (selectedCountries) => {
    if (selectedCountries.length >= __MIN_COUNTRIES__) {
      dispatch(UiActions.updateSelectedCountries(selectedCountries))
    } else {
      dispatch(UiActions.updateSelectedCountries([]))
    }
    setModalOpen(false)
  }

  const canSave = (selectedCountries) => selectedCountries.length >= __MIN_COUNTRIES__

  return (
    <div className="country-selector">
      <CountrySelectionModal
        isOpen={modalOpen}
        countries={countries}
        headerLabel={i18n.t('common.select')}
        onClose={onClose}
        canSave={canSave}
        showCount
      />
      <button onClick={() => setModalOpen(true)} className="btn btn-primary filter-countries">
        Filter countries
      </button>
    </div>
  )
}

export default CountrySelector

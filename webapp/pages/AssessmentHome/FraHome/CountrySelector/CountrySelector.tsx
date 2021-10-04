import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useCountries, useSecondaryGroupedRegions } from '@webapp/store/app'
import { useHomeCountriesFilter, HomeActions } from '@webapp/store/page/home'
import { useI18n } from '@webapp/hooks'

import CountrySelectModal from '@webapp/components/CountrySelectModal'

const __MIN_COUNTRIES__ = 9

const CountrySelector: React.FC = () => {
  const dispatch = useDispatch()
  const i18n = useI18n()
  const countries = useCountries()
  const secondaryRegions = useSecondaryGroupedRegions()
  const countriesFilter = useHomeCountriesFilter()
  const [modalOpen, setModalOpen] = useState(false)

  const onClose = (selectedCountries: Array<string>) => {
    if (selectedCountries.length >= __MIN_COUNTRIES__) {
      dispatch(HomeActions.updateCountriesFilter(selectedCountries))
    } else {
      dispatch(HomeActions.updateCountriesFilter([]))
    }
    setModalOpen(false)
  }

  const canSave = (selectedCountries: Array<string>) => selectedCountries.length >= __MIN_COUNTRIES__

  return (
    <div className="country-selector">
      <CountrySelectModal
        countries={countries}
        initialSelection={countriesFilter}
        open={modalOpen}
        headerLabel={i18n.t('common.select')}
        onClose={onClose}
        canSave={canSave}
        excludedRegions={secondaryRegions.regions.map((r: any) => r.regionCode)}
        showCount
      />
      <button onClick={() => setModalOpen(true)} className="btn-s btn btn-primary filter-countries" type="button">
        {i18n.t('common.filterCountries')}
      </button>
    </div>
  )
}
export default CountrySelector

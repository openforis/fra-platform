import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { CountryIso, Region, RegionCode } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { useCountries, useSecondaryRegion } from 'client/store/area'
import { useHomeCountriesFilter } from 'client/store/ui/home'
import { HomeActions } from 'client/store/ui/home/slice'
import CountrySelectModal from 'client/components/CountrySelectModal'

const __MIN_COUNTRIES__ = 9

const CountrySelector: React.FC = () => {
  const dispatch = useAppDispatch()
  const i18n = useTranslation()
  const countries = useCountries()
  const secondaryRegions = useSecondaryRegion()

  const countriesFilter = useHomeCountriesFilter()
  const [modalOpen, setModalOpen] = useState(false)

  const onClose = (selectedCountries: Array<CountryIso>) => {
    if (selectedCountries.length >= __MIN_COUNTRIES__) {
      dispatch(HomeActions.updateCountriesFilter(selectedCountries))
    } else {
      dispatch(HomeActions.updateCountriesFilter([]))
    }
    setModalOpen(false)
  }

  const canSave = (selectedCountries: Array<string>) => selectedCountries.length >= __MIN_COUNTRIES__

  if (Objects.isEmpty(countries)) return null

  return (
    <div className="country-selector">
      <CountrySelectModal
        countries={countries}
        initialSelection={countriesFilter}
        open={modalOpen}
        headerLabel={i18n.t<string>('common.select')}
        onClose={onClose}
        canSave={canSave}
        excludedRegions={[RegionCode.FE, ...secondaryRegions.regions.map((r: Region) => r.regionCode)]}
        showCount
      />
      <button onClick={() => setModalOpen(true)} className="btn-s btn btn-primary filter-countries" type="button">
        {i18n.t<string>('common.filterCountries')}
      </button>
    </div>
  )
}
export default CountrySelector

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { CountryIso, Region, RegionCode } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { useCountries, useSecondaryRegion } from 'client/store/area'
import { useHomeCountriesFilter } from 'client/store/ui/home'
import { HomeActions } from 'client/store/ui/home/slice'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import CountrySelectModal from 'client/components/CountrySelectModal'

const __MIN_COUNTRIES__ = 9

const CountrySelector: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
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
        canSave={canSave}
        countries={countries}
        excludedRegions={[RegionCode.FE, ...secondaryRegions.regions.map((r: Region) => r.regionCode)]}
        headerLabel={t('common.select')}
        initialSelection={countriesFilter}
        onClose={onClose}
        open={modalOpen}
        showCount
      />
      <Button
        iconName="filter"
        inverse={Objects.isEmpty(countriesFilter)}
        label={t('common.filterCountries')}
        onClick={() => setModalOpen(true)}
        size={ButtonSize.s}
      />
    </div>
  )
}
export default CountrySelector

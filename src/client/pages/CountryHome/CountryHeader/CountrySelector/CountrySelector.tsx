import './CountrySelector.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Areas, CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { useCountries } from 'client/store/area'
import { useDashboardItems } from 'client/store/metadata'
import { useHomeCountriesFilter } from 'client/store/ui/home'
import { HomeActions } from 'client/store/ui/home/slice'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import CountryMultiSelect from 'client/components/CountryMultiSelect'
import Hr from 'client/components/Hr'
import Icon from 'client/components/Icon'

const __MIN_COUNTRIES__ = 9

const CountrySelector: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const countries = useCountries()
  const countriesFilter = useHomeCountriesFilter()
  const { countryIso } = useCountryRouteParams()
  const [selection, setSelection] = useState<Array<CountryIso>>(countriesFilter)

  const dashboardItems = useDashboardItems()

  const error = selection.length > 0 && selection.length < __MIN_COUNTRIES__

  const onMenuClose = () => {
    if (!error) dispatch(HomeActions.updateCountriesFilter(selection))
  }

  if (Objects.isEmpty(countries)) return null
  if (!Areas.isISOGlobal(countryIso)) return null
  if (!dashboardItems) return null

  const errorMessage =
    selection.length > 0 && selection.length < __MIN_COUNTRIES__
      ? t('statisticalFactsheets.validation.selectAtLeastNCountries', { count: __MIN_COUNTRIES__ })
      : undefined

  return (
    <div className="country-selector">
      <Hr vertical />
      <Icon name="filter" />
      <CountryMultiSelect
        error={errorMessage}
        onChange={(value) => setSelection(value as Array<CountryIso>)}
        onMenuClose={onMenuClose}
        placeholder={t('common.filterCountries')}
        value={selection}
      />
    </div>
  )
}

export default CountrySelector

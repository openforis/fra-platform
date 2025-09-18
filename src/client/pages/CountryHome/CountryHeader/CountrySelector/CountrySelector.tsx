import './CountrySelector.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Areas, CountryIso } from 'meta/area'

import { useCountries } from 'client/store/area/hooks/countries'
import { useAppDispatch } from 'client/store/hooks'
import { useDashboardItems } from 'client/store/meta/hooks/dashboard'
import { CountryReportActions } from 'client/store/ui/countryReport/actions'
import { useGlobalCountries } from 'client/store/ui/countryReport/hooks/globalCountries'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import CountryMultiSelect from 'client/components/CountryMultiSelect'
import Hr from 'client/components/Hr'
import Icon from 'client/components/Icon'

const __MIN_COUNTRIES__ = 9

const CountrySelector: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const countries = useCountries()
  const countriesFilter = useGlobalCountries()
  const { countryIso } = useCountryRouteParams()
  const [selection, setSelection] = useState<Array<CountryIso>>(countriesFilter)

  const dashboardItems = useDashboardItems()

  const error = selection.length > 0 && selection.length < __MIN_COUNTRIES__

  const onMenuClose = (): void => {
    if (!error) dispatch(CountryReportActions.setGlobalCountries(selection))
  }

  if (Objects.isEmpty(countries)) return null
  if (!Areas.isISOGlobal(countryIso)) return null
  if (!dashboardItems) return null

  const errorMessage =
    selection.length > 0 && selection.length < __MIN_COUNTRIES__
      ? t('statisticalFactsheets.validation.selectAtLeastNCountries', { count: __MIN_COUNTRIES__ })
      : undefined

  return (
    <>
      <Hr dark vertical />
      <div className="country-selector">
        <Icon name="filter" />
        <CountryMultiSelect
          allowAtlantis={false}
          error={errorMessage}
          onChange={(value): void => setSelection(value as Array<CountryIso>)}
          onMenuClose={onMenuClose}
          placeholder={t('common.filterCountries')}
          value={selection}
        />
      </div>
    </>
  )
}

export default CountrySelector

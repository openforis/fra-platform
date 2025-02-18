import './CountrySelector.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { Areas, CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { useCountries } from 'client/store/area'
import { useDashboardItems } from 'client/store/metadata'
import { useHomeCountriesFilter } from 'client/store/ui/home'
import { HomeActions } from 'client/store/ui/home/slice'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import CountryMultiSelect from 'client/components/CountryMultiSelect/CountryMultiSelect'
import Icon from 'client/components/Icon'

import { useTooltipContent } from './hooks/useTooltipContent'

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
  const errorMessage = t('statisticalFactsheets.validation.selectAtLeastNCountries', { count: __MIN_COUNTRIES__ })

  const { hideTooltip, showTooltip, tooltipContent, dataTooltipId } = useTooltipContent({
    selection,
    error,
    errorMessage,
  })

  const onMenuClose = () => {
    if (!error) dispatch(HomeActions.updateCountriesFilter(selection))
    showTooltip()
  }

  const onChange = (selection: Array<CountryIso>) => {
    setSelection(selection)
  }

  if (Objects.isEmpty(countries)) return null
  if (!Areas.isISOGlobal(countryIso)) return null
  if (!dashboardItems) return null

  const placeholder = t('common.filterCountries')

  return (
    <div
      className="country-selector"
      data-tooltip-class-name="filter-country__tooltip"
      data-tooltip-delay-hide={100}
      data-tooltip-html={tooltipContent}
      data-tooltip-id={dataTooltipId}
      data-tooltip-place="bottom"
    >
      <Icon name="filter" />

      <CountryMultiSelect
        classNames={{
          container: classNames('filter-multiselect__container', {
            active: selection?.length > 0,
            error: true,
          }),
        }}
        collapsibleGroups
        isMulti
        onChange={onChange}
        onMenuClose={onMenuClose}
        onMenuOpen={hideTooltip}
        placeholder={placeholder}
        selectableGroups
        toggleAll
        value={selection}
      />
    </div>
  )
}

export default CountrySelector

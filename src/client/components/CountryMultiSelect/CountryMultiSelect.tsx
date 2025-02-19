import './CountryMultiSelect.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { CountryIso } from 'meta/area'

import Select from 'client/components/Inputs/Select'

import { useCountriesByRegionOptions } from './hooks/useCountriesByRegionOptions'
import { useTooltipContent } from './hooks/useTooltipContent'
import { Props } from './types'

const CountryMultiSelect: React.FC<Props> = (props) => {
  const { value, onChange, placeholder, error = false, minCountries, onMenuClose } = props

  const { t } = useTranslation()
  const optionGroups = useCountriesByRegionOptions()

  const errorMessage = minCountries
    ? t('statisticalFactsheets.validation.selectAtLeastNCountries', { count: minCountries })
    : undefined

  const { hideTooltip, showTooltip, tooltipContent, dataTooltipId } = useTooltipContent({
    value: (value as Array<CountryIso>) ?? [],
    error,
    errorMessage,
  })

  const handleMenuOpen = () => {
    hideTooltip()
  }

  const handleMenuClose = () => {
    showTooltip()
    onMenuClose?.()
  }

  const active = useMemo(() => Array.isArray(value) && value.length > 0, [value])
  const container = classNames('filter-multiselect__container', { active, error })
  return (
    <div
      className="filter-multiselect__tooltip-trigger"
      data-tooltip-class-name="filter-country__tooltip"
      data-tooltip-delay-hide={100}
      data-tooltip-html={tooltipContent}
      data-tooltip-id={dataTooltipId}
      data-tooltip-place="bottom"
    >
      <Select
        classNames={{ container }}
        collapsibleGroups
        isMulti
        multiLabelSummaryKey="admin.country"
        onChange={onChange}
        onMenuClose={handleMenuClose}
        onMenuOpen={handleMenuOpen}
        options={optionGroups}
        placeholder={placeholder ?? t('common.countries')}
        selectableGroups
        toggleAll
        value={value}
      />
    </div>
  )
}

export default CountryMultiSelect

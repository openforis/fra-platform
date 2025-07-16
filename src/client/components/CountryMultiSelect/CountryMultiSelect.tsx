import './CountryMultiSelect.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'

import Select from 'client/components/Inputs/Select'

import { useCountriesByRegionOptions } from './hooks/useCountriesByRegionOptions'
import { useTooltipContent } from './hooks/useTooltipContent'
import { Props } from './types'

const defaults: Readonly<Partial<Props>> = {
  isMulti: true,
}

const CountryMultiSelect: React.FC<Props> = (props) => {
  const { error, isMulti = defaults.isMulti, onChange, onMenuClose, placeholder, value, ...otherProps } = props

  const { t } = useTranslation()
  const optionGroups = useCountriesByRegionOptions()

  const { dataTooltipId, hideTooltip, showTooltip, tooltipContent } = useTooltipContent({
    error,
    isMulti,
    value: (value as Array<CountryIso>) ?? [],
  })

  const handleMenuOpen = () => {
    hideTooltip()
  }

  const handleMenuClose = () => {
    showTooltip()
    onMenuClose?.()
  }

  const active = useMemo(() => !Objects.isEmpty(value), [value])
  const container = classNames('country-multiselect__container', { active, error })
  return (
    <div
      className="country-multiselect__tooltip-trigger"
      data-tooltip-class-name="country-multiselect__tooltip"
      data-tooltip-delay-hide={100}
      data-tooltip-html={tooltipContent}
      data-tooltip-id={dataTooltipId}
      data-tooltip-place="bottom"
    >
      <Select
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
        classNames={{ container }}
        collapsibleGroups
        isMulti={isMulti}
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

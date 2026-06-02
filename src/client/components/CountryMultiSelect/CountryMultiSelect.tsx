import './CountryMultiSelect.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { CountryIso } from 'meta/area/countryIso'
import { Objects } from 'utils/objects'

import Select from 'client/components/Inputs/Select'

import { useCountriesByRegionOptions } from './hooks/useCountriesByRegionOptions'
import { useIsOptionDisabled } from './hooks/useIsOptionDisabled'
import { useMenuActions } from './hooks/useMenuActions'
import { useTooltipContent } from './hooks/useTooltipContent'
import { Props } from './types'

const defaults: Readonly<Partial<Props>> = {
  isMulti: true,
}

const CountryMultiSelect: React.FC<Props> = (props) => {
  const {
    allowAtlantis = true,
    allowedCountries,
    disabledOptions,
    error,
    isMulti = defaults.isMulti,
    onChange,
    placeholder,
    value,
    ...otherProps
  } = props

  const { t } = useTranslation()
  const optionGroups = useCountriesByRegionOptions({ allowedCountries, allowAtlantis, disabledOptions })
  const isOptionDisabled = useIsOptionDisabled(props)
  const tooltip = useTooltipContent({
    allowAtlantis,
    allowedCountries,
    error,
    isMulti,
    value: (value as Array<CountryIso>) ?? [],
  })
  const { onMenuClose, onMenuOpen } = useMenuActions({ ...props, tooltip })

  const active = useMemo(() => !Objects.isEmpty(value), [value])
  const container = classNames('country-multiselect__container', { active, error })
  const { dataTooltipId, tooltipContent } = tooltip

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
        isOptionDisabled={isOptionDisabled}
        multiLabelSummaryKey="common.countriesAreas"
        onChange={onChange}
        onMenuClose={onMenuClose}
        onMenuOpen={onMenuOpen}
        options={optionGroups}
        placeholder={placeholder ?? t('common.countriesAreas')}
        selectableGroups
        toggleAll
        value={value}
      />
    </div>
  )
}

export default CountryMultiSelect

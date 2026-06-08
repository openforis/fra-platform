import './CountryMultiSelect.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { Objects } from 'utils/objects'

import TooltipCountries from 'client/components/CountryMultiSelect/TooltipCountries'
import Select from 'client/components/Inputs/Select'

import { useCountriesByRegionOptions } from './hooks/useCountriesByRegionOptions'
import { useIsOptionDisabled } from './hooks/useIsOptionDisabled'
import { useMenuActions } from './hooks/useMenuActions'
import { useTooltipProps } from './hooks/useTooltipProps'
import { Props } from './types'

const defaults: Readonly<Partial<Props>> = {
  allowAtlantis: true,
  isMulti: true,
  value: [],
}

const CountryMultiSelect: React.FC<Props> = (props) => {
  const {
    allowAtlantis = defaults.allowAtlantis,
    allowedCountries,
    disabledOptions,
    error,
    isMulti = defaults.isMulti,
    onChange,
    placeholder,
    value = defaults.value,
    ...otherProps
  } = props

  const { t } = useTranslation()
  const optionGroups = useCountriesByRegionOptions({ allowedCountries, allowAtlantis, disabledOptions })
  const isOptionDisabled = useIsOptionDisabled(props)
  const tooltip = useTooltipProps({ error })
  const { onMenuClose, onMenuOpen } = useMenuActions({ ...props, tooltip })

  const active = useMemo(() => !Objects.isEmpty(value), [value])
  const container = classNames('country-multiselect__container', { active, error })
  const { canDisplayTooltip, dataTooltipId } = tooltip

  return (
    <div className="country-multiselect__tooltip-trigger" data-tooltip-id={dataTooltipId}>
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
      <TooltipCountries
        allowAtlantis={allowAtlantis}
        allowedCountries={allowedCountries}
        canDisplayTooltip={canDisplayTooltip}
        error={error}
        isMulti={isMulti}
        tooltipId={dataTooltipId}
        value={value}
      />
    </div>
  )
}

export default CountryMultiSelect

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { GroupBase, SelectComponentsConfig } from 'react-select'

import {
  ClearIndicator,
  DropdownIndicator,
  IndicatorsContainer,
  MultiSelectOption,
} from 'client/components/Inputs/Select/Indicators'
import { OptionsOrGroups, selectAllOptionValue } from 'client/components/Inputs/Select/types'

import { ValueSelect } from './useValue'

type Props = {
  isMulti: boolean
  options: OptionsOrGroups
  toggleAll: boolean
  value: ValueSelect
}

type Returned = {
  components: Partial<SelectComponentsConfig<unknown, boolean, GroupBase<unknown>>>
  hideSelectedOptions: boolean | undefined
  options: OptionsOrGroups
}

export const useToggleAllConfig = (props: Props): Returned => {
  const { isMulti, options, toggleAll, value } = props
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const components: Returned['components'] = {
      ClearIndicator,
      DropdownIndicator,
      IndicatorsContainer,
      IndicatorSeparator: null,
    }

    if (isMulti && toggleAll) {
      components.Option = MultiSelectOption
      const selectAllOption = {
        value: selectAllOptionValue,
        label: Array.isArray(value) && value.length === 0 ? t('common.selectAll') : t('common.unselectAll'),
      }
      return { components, hideSelectedOptions: false, options: [selectAllOption, ...options] }
    }

    return { components, hideSelectedOptions: undefined, options }
  }, [isMulti, options, t, toggleAll, value])
}

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { MultiSelectOption } from 'client/components/Inputs/Select/Indicators'
import { OptionsOrGroups, selectAllOptionValue } from 'client/components/Inputs/Select/types'

import { ValueSelect } from './useValue'

type Props = {
  isMulti: boolean
  options: OptionsOrGroups
  toggleAll: boolean
  value: ValueSelect
}

type Returned = {
  optionComponent: React.FC | undefined
  options: OptionsOrGroups
}

export const useToggleAllConfig = (props: Props): Returned => {
  const { isMulti, options, toggleAll, value } = props
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    if (!isMulti) return { optionComponent: undefined, options }

    const optionComponent = MultiSelectOption

    if (!toggleAll) return { optionComponent, options }

    const selectAllOption = {
      value: selectAllOptionValue,
      label: Array.isArray(value) && value.length === 0 ? t('common.selectAll') : t('common.unselectAll'),
    }
    return { optionComponent, options: [selectAllOption, ...options] }
  }, [isMulti, options, t, toggleAll, value])
}

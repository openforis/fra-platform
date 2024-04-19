import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ToggleAllOptions } from 'client/components/Inputs/Select/toggleAllOptions'
import { OptionsOrGroups, SelectProps } from 'client/components/Inputs/Select/types'

export const useOptions = (props: SelectProps): OptionsOrGroups => {
  const { isMulti, options, toggleAll, value } = props

  const { t } = useTranslation()

  return useMemo<OptionsOrGroups>(() => {
    if (!isMulti || !toggleAll) return options

    return [ToggleAllOptions.newOption({ value, t }), ...options]
  }, [isMulti, options, t, toggleAll, value])
}

import { useCallback } from 'react'

import { Props } from 'client/components/CountryMultiSelect/types'
import { Option, SelectProps } from 'client/components/Inputs/Select'

type Returned = SelectProps['isOptionDisabled']

export const useIsOptionDisabled = (props: Props): Returned => {
  const { disabledOptions } = props

  return useCallback<Returned>(
    (option: Option) => {
      return disabledOptions?.includes(option.value)
    },
    [disabledOptions]
  )
}

import { useMemo } from 'react'
import { Props as ReactSelectProps } from 'react-select'

import {
  ClearIndicator,
  DropdownIndicator,
  IndicatorsContainer,
  MultiSelectOption,
} from 'client/components/Inputs/Select/Indicators'
import { SelectProps } from 'client/components/Inputs/Select/types'

type Returned = ReactSelectProps['components']

export const useComponents = (props: SelectProps): Returned => {
  const { isMulti } = props

  return useMemo<Returned>(() => {
    return {
      ClearIndicator,
      DropdownIndicator,
      IndicatorsContainer,
      IndicatorSeparator: null,
      Option: isMulti ? MultiSelectOption : null,
    }
  }, [isMulti])
}

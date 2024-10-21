import React, { useMemo } from 'react'
import { MultiValueProps as OriginalMultiValueProps, Props as ReactSelectProps } from 'react-select'

import { Objects } from 'utils/objects'

import {
  ClearIndicator,
  DropdownIndicator,
  IndicatorsContainer,
  MultiSelectOption,
  MultiValueSummary,
} from 'client/components/Inputs/Select/Indicators'
import { SelectProps } from 'client/components/Inputs/Select/types'

type Returned = ReactSelectProps['components']

export const useComponents = (props: SelectProps): Returned => {
  const { isMulti, multiLabelKey } = props

  return useMemo<Returned>(() => {
    const components: Returned = {
      ClearIndicator,
      DropdownIndicator,
      IndicatorsContainer,
      IndicatorSeparator: null,
    }
    if (isMulti) components.Option = MultiSelectOption
    if (isMulti && !Objects.isEmpty(multiLabelKey)) {
      components.MultiValue = (originalMultiValueProps: OriginalMultiValueProps) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <MultiValueSummary {...originalMultiValueProps} multiLabelKey={multiLabelKey} />
      )
    }

    return components
  }, [isMulti, multiLabelKey])
}

import React, { useMemo } from 'react'
import { MultiValueProps, Props as ReactSelectProps } from 'react-select'

import { Objects } from 'utils/objects'

import {
  ClearIndicator,
  CollapsibleGroup,
  DropdownIndicator,
  IndicatorsContainer,
  MultiSelectOption,
  MultiValueSummary,
  SelectableGroupHeading,
} from 'client/components/Inputs/Select/Indicators'
import { SelectProps } from 'client/components/Inputs/Select/types'

type Returned = ReactSelectProps['components']

export const useComponents = (props: SelectProps): Returned => {
  const { collapsibleGroups, isMulti, multiLabelSummaryKey, selectableGroups } = props

  return useMemo<Returned>(() => {
    const components: Returned = {
      ClearIndicator,
      DropdownIndicator,
      IndicatorsContainer,
      IndicatorSeparator: null,
    }
    if (isMulti) components.Option = MultiSelectOption
    if (isMulti && !Objects.isEmpty(multiLabelSummaryKey)) {
      components.MultiValue = (originalMultiValueProps: MultiValueProps) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <MultiValueSummary {...originalMultiValueProps} multiLabelSummaryKey={multiLabelSummaryKey} />
      )
    }
    if (isMulti && selectableGroups) components.GroupHeading = SelectableGroupHeading
    if (collapsibleGroups) components.Group = CollapsibleGroup

    return components
  }, [collapsibleGroups, isMulti, multiLabelSummaryKey, selectableGroups])
}

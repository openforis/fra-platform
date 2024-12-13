import React, { useMemo } from 'react'
import { components as originalComponents, InputProps, MultiValueProps, Props as ReactSelectProps } from 'react-select'

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
  const { collapsibleGroups, inputHidden, isMulti, multiLabelSummaryKey, onPaste, selectableGroups } = props

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
    if (Objects.isFunction(onPaste) || !Objects.isEmpty(inputHidden)) {
      components.Input = (originalInputProps: InputProps) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <originalComponents.Input {...originalInputProps} isHidden={inputHidden} onPaste={onPaste} />
      }
    }

    return components
  }, [collapsibleGroups, inputHidden, isMulti, multiLabelSummaryKey, onPaste, selectableGroups])
}

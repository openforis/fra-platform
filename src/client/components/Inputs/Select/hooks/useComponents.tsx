import React, { ReactElement, useMemo } from 'react'
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

// Keep same reference between renders
const EMPTY_COMPONENTS: Returned = {}

export const useComponents = (props: SelectProps): Returned => {
  const {
    collapsibleGroups,
    components: _components = EMPTY_COMPONENTS,
    hideDropdownIndicator,
    inputHidden,
    isMulti,
    multiLabelSummaryKey,
    selectableGroups,
  } = props

  return useMemo<Returned>(() => {
    const components: Returned = {
      ClearIndicator,
      DropdownIndicator,
      IndicatorsContainer,
      IndicatorSeparator: null,
    }
    if (isMulti) components.Option = MultiSelectOption
    if (isMulti && !Objects.isEmpty(multiLabelSummaryKey)) {
      components.MultiValue = (originalMultiValueProps: MultiValueProps): ReactElement => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <MultiValueSummary {...originalMultiValueProps} multiLabelSummaryKey={multiLabelSummaryKey} />
      )
    }
    if (isMulti && selectableGroups) components.GroupHeading = SelectableGroupHeading
    if (collapsibleGroups) components.Group = CollapsibleGroup
    if (!Objects.isEmpty(inputHidden)) {
      components.Input = (originalInputProps: InputProps): ReactElement => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <originalComponents.Input {...originalInputProps} isHidden={inputHidden} />
      }
    }
    if (hideDropdownIndicator) components.DropdownIndicator = null

    return { ...components, ..._components }
  }, [
    _components,
    collapsibleGroups,
    hideDropdownIndicator,
    inputHidden,
    isMulti,
    multiLabelSummaryKey,
    selectableGroups,
  ])
}

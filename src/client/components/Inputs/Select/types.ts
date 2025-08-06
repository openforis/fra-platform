import { ActionMeta, Props as ReactSelectProps } from 'react-select'
import { CreatableProps } from 'react-select/creatable'

export type Option = {
  label: string
  value: string
}

export type OptionsGroup = {
  disabled?: boolean
  label?: string
  options: Array<Option>
}

export type OptionsOrGroups = ReadonlyArray<Option | OptionsGroup>

export type ValueInput = string | Array<string> | null

type SelectBaseProps =
  | Pick<
      ReactSelectProps,
      | 'inputValue'
      | 'isClearable'
      | 'isMulti'
      | 'isOptionDisabled'
      | 'maxMenuHeight'
      | 'onBlur'
      | 'onFocus'
      | 'onInputChange'
      | 'onMenuClose'
      | 'onMenuOpen'
      | 'placeholder'
    > &
      Pick<
        CreatableProps<Option, boolean, OptionsGroup>,
        'createOptionPosition' | 'onCreateOption' | 'isValidNewOption'
      >

type SelectClassNamesProps = {
  classNames?: { container?: string }
}
export type SelectProps = SelectBaseProps &
  SelectClassNamesProps & {
    collapsibleGroups?: boolean
    createOptionLabelKey?: string
    disabled?: boolean
    hideDropdownIndicator?: boolean
    inputHidden?: boolean
    isCreatable?: boolean
    multiLabelSummaryKey?: string
    onChange: (value: string | Array<string> | null, actionMeta: ActionMeta<Option>) => void
    onPaste?: React.ClipboardEventHandler<HTMLDivElement>
    options: OptionsOrGroups
    selectableGroups?: boolean
    toggleAll?: boolean
    value?: ValueInput
  }

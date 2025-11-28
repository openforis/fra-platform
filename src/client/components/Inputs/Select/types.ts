import { ActionMeta, Props as ReactSelectProps } from 'react-select'
import { CreatableProps } from 'react-select/creatable'

export type Option = {
  label: React.ReactNode
  value: string
}

export type OptionsGroup = {
  disabled?: boolean
  label?: string
  options: Array<Option>
}

export type OptionsOrGroups = ReadonlyArray<Option | OptionsGroup>

export type ValueInput = string | Array<string> | null

type SelectBaseProps = Pick<
  ReactSelectProps,
  | 'formatOptionLabel'
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
  Pick<CreatableProps<Option, boolean, OptionsGroup>, 'createOptionPosition' | 'onCreateOption' | 'isValidNewOption'>

type SelectClassNamesProps = {
  classNames?: { container?: string }
}

export enum SelectSize {
  s = 's',
}

export type SelectProps = SelectBaseProps &
  SelectClassNamesProps & {
    bordered?: boolean
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
    size?: SelectSize
    toggleAll?: boolean
    value?: ValueInput
  }

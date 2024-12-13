import { Props as ReactSelectProps } from 'react-select'
import { CreatableProps } from 'react-select/creatable'

export type Option = {
  label: string
  value: string
}

export type OptionsGroup = {
  label?: string
  options: Array<Option>
}

export type OptionsOrGroups = readonly (Option | OptionsGroup)[]

export type ValueInput = string | Array<string> | null

type SelectBaseProps =
  | Pick<
      ReactSelectProps,
      | 'inputValue'
      | 'isClearable'
      | 'isMulti'
      | 'maxMenuHeight'
      | 'onBlur'
      | 'onFocus'
      | 'onInputChange'
      | 'onMenuClose'
      | 'onMenuOpen'
      | 'placeholder'
    > &
      Pick<CreatableProps<Option, boolean, OptionsGroup>, 'isValidNewOption' | 'onCreateOption'>

type SelectClassNamesProps = {
  classNames?: { container?: string }
}
export type SelectProps = SelectBaseProps &
  SelectClassNamesProps & {
    collapsibleGroups?: boolean
    createOptionLabelKey?: string
    disabled?: boolean
    inputHidden?: boolean
    isCreatable?: boolean
    multiLabelSummaryKey?: string
    onChange: (value: string | Array<string> | null) => void
    onPaste?: React.ClipboardEventHandler<HTMLInputElement>
    options: OptionsOrGroups
    selectableGroups?: boolean
    toggleAll?: boolean
    value?: ValueInput
  }

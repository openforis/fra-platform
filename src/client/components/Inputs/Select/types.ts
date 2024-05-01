import { Props as ReactSelectProps } from 'react-select'

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

type SelectBaseProps = Pick<ReactSelectProps, 'isClearable' | 'isMulti' | 'maxMenuHeight' | 'placeholder'>
type SelectClassNamesProps = {
  classNames?: { container?: string }
}
export type SelectProps = SelectBaseProps &
  SelectClassNamesProps & {
    disabled?: boolean
    onChange: (value: string | Array<string> | null) => void
    options: OptionsOrGroups
    toggleAll?: boolean
    value?: ValueInput
  }

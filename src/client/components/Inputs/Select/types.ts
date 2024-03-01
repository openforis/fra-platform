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

export type SelectProps = Pick<ReactSelectProps, 'isClearable' | 'isMulti'> & {
  disabled?: boolean
  onChange: (value: string | Array<string> | null) => void
  options: OptionsOrGroups
  value?: ValueInput
}

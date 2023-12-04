import { Option } from 'client/components/Inputs/Select/types'

export type Props = {
  value: string
  onChange: (newValue: string) => void
  disabled: boolean
  options: Array<Option>
}

import { SelectProps } from 'client/components/Inputs/Select'

export interface Props extends Omit<SelectProps, 'options'> {
  error?: string
  minCountries?: number
}

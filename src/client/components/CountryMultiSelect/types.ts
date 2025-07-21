import { CountryIso } from 'meta/area'

import { SelectProps } from 'client/components/Inputs/Select'

export interface Props extends Omit<SelectProps, 'options'> {
  allowedCountries?: Array<CountryIso>
  error?: string
  minCountries?: number
}

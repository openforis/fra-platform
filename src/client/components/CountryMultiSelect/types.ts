import { CountryIso } from 'meta/area'

import { SelectProps } from 'client/components/Inputs/Select'

export interface Props extends Omit<SelectProps, 'isOptionDisabled' | 'options'> {
  allowedCountries?: Array<CountryIso>
  disabledOptions?: Array<CountryIso | string>
  error?: string
  minCountries?: number
}

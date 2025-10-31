import { CountryIso } from 'meta/area/countryIso'

import { SelectProps } from 'client/components/Inputs/Select'

export interface Props extends Omit<SelectProps, 'isOptionDisabled' | 'options'> {
  allowedCountries?: Array<CountryIso>
  allowAtlantis?: boolean
  disabledOptions?: Array<CountryIso | string>
  error?: string
  minCountries?: number
}

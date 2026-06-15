import { CountryIso } from 'meta/area/countryIso'

import { SelectProps } from 'client/components/Inputs/Select'

export interface Props extends Omit<SelectProps, 'isOptionDisabled' | 'options' | 'tooltip' | 'value'> {
  allowAtlantis?: boolean
  allowedCountries?: Array<CountryIso>
  disabledOptions?: Array<CountryIso | string>
  error?: string
  minCountries?: number
  value?: CountryIso | Array<CountryIso>
}

import React, { ReactElement, useCallback } from 'react'

import { useCountries } from 'client/store/area/hooks/countries'
import FlagIcon from 'client/components/Form/FormFields/TelephoneField/CallingCode/FlagIcon'
import { OptionElement } from 'client/components/Inputs/Select/types'

type Returned = (option: OptionElement, { context }: { context: string }) => React.ReactElement

// Only show the flag when value selected
export const useFormatOptionLabel = (): Returned => {
  const countries = useCountries()
  return useCallback<Returned>(
    (option: OptionElement, { context }: { context: string }): ReactElement => {
      if (context === 'value') {
        const countryIso = option.value.split(':')[1]
        const country = countries.find((c) => c.countryIso === countryIso)
        return country ? <FlagIcon countryIso={country.countryIso} /> : null
      }
      return option.label
    },
    [countries]
  )
}

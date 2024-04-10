import React from 'react'

import { CountryIso } from 'meta/area'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { mapController } from 'client/utils'

const Center: React.FC = () => {
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return (
    <div className="toolbar-options__group">
      <Button
        iconName="gps-not-fixed"
        inverse
        onClick={() => {
          mapController.panToCountry(countryIso)
        }}
        size={ButtonSize.m}
        type={ButtonType.black}
      />
    </div>
  )
}

export default Center

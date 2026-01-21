import React from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import LinksTable from 'client/components/LinksTable'

const LinksStatus: React.FC = () => {
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return <LinksTable countryIso={countryIso} />
}

export default LinksStatus

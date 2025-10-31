import './FlagIcon.scss'
import React from 'react'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'

type FlagIconProps = {
  countryIso: CountryIso
}

const FlagIcon: React.FC<FlagIconProps> = (props) => {
  const { countryIso } = props
  return <div className="flag-icon" style={{ backgroundImage: Areas.getCountryBackgroundImg(countryIso) }} />
}

export default FlagIcon

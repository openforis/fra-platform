import React from 'react'
import { Link } from 'react-router'

import { Routes } from 'meta/routes/routes'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsGeoRoute } from 'client/hooks/routes'
import { ButtonSize, ButtonType, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

const iconName = 'earth'
const inverse = true
const size = ButtonSize.l

const GeoToggle: React.FC = () => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const geoRoute = useIsGeoRoute()
  const className = useButtonClassName({ iconName, inverse, size, type: ButtonType.anonymous })

  const pathGeo = Routes.Geo.generatePath({ assessmentName, cycleName, countryIso })
  const pathCountryHome = Routes.CountryHome.generatePath({ assessmentName, cycleName, countryIso })
  const to = geoRoute ? pathCountryHome : pathGeo

  return (
    <Link className={className} to={to}>
      <Icon name={iconName} />
    </Link>
  )
}

export default GeoToggle

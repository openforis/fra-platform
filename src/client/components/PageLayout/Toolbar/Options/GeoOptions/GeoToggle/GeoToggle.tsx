import React from 'react'
import { Link, useNavigate, useNavigationType } from 'react-router-dom'

import { Routes } from 'meta/routes'

import { useIsGeoRoute } from 'client/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize, ButtonType, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

const iconName = 'earth'
const inverse = true
const size = ButtonSize.l

const GeoToggle: React.FC = () => {
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const geoRoute = useIsGeoRoute()
  const classNameLinkGeo = useButtonClassName({ iconName, inverse, size, type: ButtonType.anonymous })

  const pathGeo = Routes.Geo.generatePath({ assessmentName, cycleName, countryIso })
  const pathCountryHome = Routes.CountryHome.generatePath({ assessmentName, cycleName, countryIso })

  if (geoRoute) {
    return (
      <Button
        iconName="earth"
        onClick={() => {
          if (navigationType === 'POP') navigate(-1)
          else navigate(pathCountryHome)
        }}
        size={size}
        type={ButtonType.black}
      />
    )
  }

  return (
    <Link className={classNameLinkGeo} to={pathGeo}>
      <Icon className="icon-no-margin icon-sub" name="earth" />
    </Link>
  )
}

export default GeoToggle

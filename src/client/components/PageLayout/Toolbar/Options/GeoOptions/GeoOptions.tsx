import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { Routes } from 'meta/routes'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoMapOptions } from 'client/store/ui/geo'
import { useIsGeoRoute } from 'client/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize, ButtonType, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

const iconName = 'earth'
const inverse = true
const size = ButtonSize.l

const GeoOptions: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const geoRoute = useIsGeoRoute()
  const { mapTypeId } = useGeoMapOptions()
  const classNameLinkGeo = useButtonClassName({ iconName, inverse, size, type: ButtonType.anonymous })

  const setMapTypeId = useCallback(
    (_mapTypeId: google.maps.MapTypeId) => {
      dispatch(GeoActions.setMapOptions({ mapTypeId: _mapTypeId }))
    },
    [dispatch]
  )

  const pathGeo = Routes.Geo.generatePath({ assessmentName, cycleName, countryIso })

  if (geoRoute) {
    return (
      <>
        <Button
          inverse={mapTypeId === 'satellite'}
          label={t('geo.map')}
          onClick={() => setMapTypeId(google.maps.MapTypeId.ROADMAP)}
          size={ButtonSize.m}
          type={ButtonType.blackMap}
        />
        <div className="toolbar__separator" />
        <Button
          inverse={mapTypeId === 'roadmap'}
          label={t('geo.satellite')}
          onClick={() => setMapTypeId(google.maps.MapTypeId.SATELLITE)}
          size={ButtonSize.m}
          type={ButtonType.blackMap}
        />
        <div className="toolbar__separator" />
        <Button iconName="earth" onClick={() => navigate(-1)} size={size} type={ButtonType.blackMap} />
      </>
    )
  }

  return (
    <>
      <div className="toolbar__separator" />
      <Link className={classNameLinkGeo} to={pathGeo}>
        <Icon className="icon-no-margin icon-sub" name="earth" />
      </Link>
    </>
  )
}

export default GeoOptions

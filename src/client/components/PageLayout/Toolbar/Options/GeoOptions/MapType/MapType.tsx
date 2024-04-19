import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoMapOptions } from 'client/store/ui/geo'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

const MapType: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { mapTypeId } = useGeoMapOptions()

  const setMapTypeId = useCallback(
    (_mapTypeId: google.maps.MapTypeId) => {
      dispatch(GeoActions.setMapOptions({ mapTypeId: _mapTypeId }))
    },
    [dispatch]
  )

  return (
    <div className="toolbar-options__group">
      <Button
        inverse={mapTypeId === 'satellite'}
        label={t('geo.map')}
        onClick={() => setMapTypeId(google.maps.MapTypeId.ROADMAP)}
        size={ButtonSize.m}
        type={ButtonType.black}
      />
      <Button
        inverse={mapTypeId === 'roadmap'}
        label={t('geo.satellite')}
        onClick={() => setMapTypeId(google.maps.MapTypeId.SATELLITE)}
        size={ButtonSize.m}
        type={ButtonType.black}
      />
    </div>
  )
}

export default MapType

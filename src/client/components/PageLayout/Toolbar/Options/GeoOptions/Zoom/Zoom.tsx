import React, { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoMapOptions } from 'client/store/ui/geo'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { mapController } from 'client/utils'

const Zoom: React.FC = () => {
  const dispatch = useAppDispatch()
  const { minZoom, maxZoom } = useGeoMapOptions()

  const setZoom = useCallback(
    (_zoom: number) => {
      if (_zoom >= minZoom && _zoom <= maxZoom) {
        dispatch(GeoActions.setMapOptions({ zoom: _zoom }))
      }
    },
    [dispatch, maxZoom, minZoom]
  )

  return (
    <div className="toolbar-options__group">
      <Button
        iconName="plus-dashed"
        inverse
        onClick={() => {
          setZoom(mapController.getMap().getZoom() + 1)
        }}
        size={ButtonSize.m}
        type={ButtonType.blackMap}
      />
      <Button
        iconName="minus-dashed"
        inverse
        onClick={() => {
          setZoom(mapController.getMap().getZoom() - 1)
        }}
        size={ButtonSize.m}
        type={ButtonType.blackMap}
      />
    </div>
  )
}

export default Zoom

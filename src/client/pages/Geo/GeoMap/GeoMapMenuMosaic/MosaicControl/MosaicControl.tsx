import './MosaicControl.scss'
import React from 'react'

import { useAppDispatch } from '@client/store'
import { GeoActions, useMosaicSelected } from '@client/store/ui/geo'

import GeoMenuItem from '../../GeoMapMenuItem'
import SatelliteSourcePanel from '../SatelliteSourcePanel'

const MosaicControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const mosaicSelected = useMosaicSelected()

  return (
    <div>
      <GeoMenuItem
        title="Show mosaic layer"
        checked={mosaicSelected}
        tabIndex={-1}
        onCheckboxClick={() => dispatch(GeoActions.toggleMosaicLayer())}
      >
        <SatelliteSourcePanel />
      </GeoMenuItem>
    </div>
  )
}

export default MosaicControl

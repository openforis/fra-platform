import './MosaicControl.scss'
import React from 'react'

import { useAppDispatch } from 'client/store'
import { GeoActions, useMosaicSelected } from 'client/store/ui/geo'

import GeoMenuItem from '../../GeoMapMenuItem'
import SatelliteSourcePanel from '../SatelliteSourcePanel'

interface Props {
  loadingStatus?: string
}

const MosaicControl: React.FC<Props> = ({ loadingStatus }) => {
  const dispatch = useAppDispatch()
  const mosaicSelected = useMosaicSelected()

  return (
    <div>
      <GeoMenuItem
        title="Show mosaic layer"
        checked={mosaicSelected}
        loadingStatus={loadingStatus}
        tabIndex={-1}
        onCheckboxClick={() => dispatch(GeoActions.toggleMosaicLayer())}
      >
        <SatelliteSourcePanel loadingStatus={loadingStatus} />
      </GeoMenuItem>
    </div>
  )
}

MosaicControl.defaultProps = {
  loadingStatus: null,
}

export default MosaicControl

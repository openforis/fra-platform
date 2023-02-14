import './geoMapMenuMosaic.scss'
import React from 'react'

import { useSelectedPanel } from '@client/store/ui/geo'

import GeoMapMenuButton from '../GeoMapMenuButton'
import MosaicControl from './MosaicControl'

const GeoMapMenuMosaic: React.FC = () => {
  const selectedPanel = useSelectedPanel()

  return (
    <div className="geo-map-menu-item">
      <GeoMapMenuButton panel="mosaic" text="Background" icon="radar" />
      {selectedPanel === 'mosaic' && <MosaicControl />}
    </div>
  )
}

export default GeoMapMenuMosaic

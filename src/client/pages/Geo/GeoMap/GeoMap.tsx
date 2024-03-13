import './geoMap.scss'
import React from 'react'

import { useGeoMap } from './hooks/useGeoMap'
import { useMapLayersHandler } from './hooks/useMapLayersHandler'

type Props = {
  viewport?: google.maps.LatLngBoundsLiteral
  zoom?: number
}

const GeoMap: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { viewport, children, zoom } = props

  const { map, ref } = useGeoMap({ viewport, zoom })

  useMapLayersHandler()

  return (
    <>
      <div ref={ref} id="geo-map" />
      {map !== null ? children : null}
    </>
  )
}

GeoMap.defaultProps = {
  viewport: null,
  zoom: 4,
}

export default GeoMap

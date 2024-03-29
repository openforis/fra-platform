import './Map.scss'
import React from 'react'

import { useGeoMap } from './hooks/useGeoMap'
import { useMapLayersHandler } from './hooks/useMapLayersHandler'
import { useMapOptionsUpdateListeners } from './hooks/useMapOptionsUpdateListeners'

type Props = {
  viewport?: google.maps.LatLngBoundsLiteral
}

const Map: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { viewport, children } = props

  const { map, ref } = useGeoMap({ viewport })
  useMapLayersHandler()
  useMapOptionsUpdateListeners()

  return (
    <>
      <div ref={ref} id="geo-map" />
      {map !== null ? children : null}
    </>
  )
}

Map.defaultProps = {
  viewport: null,
}

export default Map

import './geoMap.scss'
import React, { useEffect, useRef, useState } from 'react'

import { MapContext } from '@client/hooks/useGeoMap'

type Props = {
  center: google.maps.LatLngLiteral
  zoom: number
}

const GeoMap: React.FC<Props> = ({ children, center, zoom }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
          disableDefaultUI: true,
          zoomControl: true,
          rotateControl: true,
          fullscreenControl: true,
        })
      )
    }
  }, [ref, map])

  return (
    <>
      <div ref={ref} id="geo-map" />
      <MapContext.Provider value={map}>{map !== null ? children : null}</MapContext.Provider>
    </>
  )
}

export default GeoMap

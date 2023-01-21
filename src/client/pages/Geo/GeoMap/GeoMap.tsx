import './geoMap.scss'
import React, { useEffect, useRef, useState } from 'react'

import { MapContext } from '@client/hooks'

type Props = {
  center: google.maps.LatLngLiteral
  zoom: number
}

const GeoMap: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { children, center, zoom } = props
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
          mapTypeId: google.maps.MapTypeId.HYBRID,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.RIGHT_TOP,
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID],
          },
        })
      )
    }
  }, [ref, map, center, zoom])

  return (
    <>
      <div ref={ref} id="geo-map" />
      <MapContext.Provider value={map}>{map !== null ? children : null}</MapContext.Provider>
    </>
  )
}

export default GeoMap

import './geoMap.scss'
import React, { useEffect, useRef, useState } from 'react'

import { MapContext, useCountryIso } from '@client/hooks'
import { getCountryBounds } from '@client/pages/Geo/utils/countryBounds'

type Props = {
  viewport?: google.maps.LatLngBoundsLiteral
  zoom?: number
}

const GeoMap: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { viewport, children, zoom } = props
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const countryIso = useCountryIso()

  useEffect(() => {
    if (ref.current && !map) {
      const mapSetUp = new window.google.maps.Map(ref.current, {
        zoom: zoom || 4,
        center: { lat: 0, lng: 0 },
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
      if (!zoom && viewport) mapSetUp.fitBounds(viewport)
      setMap(mapSetUp)

      // Center and focus on the current country
      getCountryBounds(countryIso).then((response) => {
        if (response?.data) {
          mapSetUp.panTo(response.data.centroid)
          mapSetUp.fitBounds(response.data.bounds)
        }
      })
    }
  }, [ref, map, zoom, viewport, countryIso])

  // Move and center the map to the new country location.
  useEffect(() => {
    getCountryBounds(countryIso).then((response) => {
      if (map && response?.data) {
        map.panTo(response.data.centroid)
        map.fitBounds(response.data.bounds)
      }
    })
  }, [countryIso, map])

  return (
    <>
      <div ref={ref} id="geo-map" />
      <MapContext.Provider value={map}>{map !== null ? children : null}</MapContext.Provider>
    </>
  )
}

GeoMap.defaultProps = {
  viewport: null,
  zoom: null,
}

export default GeoMap

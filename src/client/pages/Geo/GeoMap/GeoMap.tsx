import './geoMap.scss'
import React, { useEffect, useRef, useState } from 'react'

import { useAppDispatch } from 'client/store'
import { GeoActions } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'
// import { useMapLayersHandler } from 'client/pages/Geo/GeoMap/hooks'
import { getCountryBounds } from 'client/pages/Geo/utils/countryBounds'
import { mapController } from 'client/utils'

type Props = {
  viewport?: google.maps.LatLngBoundsLiteral
  zoom?: number
}

const GeoMap: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const dispatch = useAppDispatch()
  const { viewport, children, zoom } = props
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const countryIso = useCountryIso()
  useEffect(() => {
    if (ref.current && !map) {
      const mapSetUp = new window.google.maps.Map(ref.current, {
        zoom: zoom || 4,
        center: { lat: 0, lng: 0 }, // There needs to be a default center, otherwise the map does not render
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
      mapController.setMap(mapSetUp)
      setMap(mapSetUp)
      dispatch(GeoActions.setMapAvailability(true))
      // Center and focus on the current country
      getCountryBounds(countryIso).then((response) => {
        if (response?.data) {
          mapSetUp.panTo(response.data.centroid)
          mapSetUp.fitBounds(response.data.bounds)
        }
      })
    }
  }, [ref, map, zoom, viewport, countryIso, dispatch])

  // Add layers handler
  // useMapLayersHandler()

  // Move and center the map to the new country location.
  useEffect(() => {
    if (!map) return
    getCountryBounds(countryIso).then((response) => {
      if (response?.data) {
        map.panTo(response.data.centroid)
        map.fitBounds(response.data.bounds)
      }
    })
  }, [countryIso, map])

  return (
    <>
      <div ref={ref} id="geo-map" />
      {map !== null ? children : null}
    </>
  )
}

GeoMap.defaultProps = {
  viewport: null,
  zoom: null,
}

export default GeoMap

import { MutableRefObject, useEffect, useRef, useState } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { GeoActions } from 'client/store/ui/geo'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { getCountryBounds } from 'client/pages/Geo/utils/countryBounds'
import { mapController } from 'client/utils'

import { styles } from './styles'

type Props = {
  viewport: google.maps.LatLngBoundsLiteral | null
  zoom: number
}

type Returned = {
  ref: MutableRefObject<HTMLDivElement>
  map: google.maps.Map
}

export const useGeoMap = (props: Props): Returned => {
  const { viewport, zoom } = props

  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  const { countryIso } = useCountryRouteParams<CountryIso>()

  useEffect(() => {
    if (!ref.current || map) return

    const mapSetup = new window.google.maps.Map(ref.current, {
      controlSize: 24,
      // There needs to be a default center, otherwise the map does not render
      center: { lat: 0, lng: 0 },
      disableDefaultUI: true,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
      },
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID],
        position: google.maps.ControlPosition.TOP_RIGHT,
        style: google.maps.MapTypeControlStyle.DEFAULT,
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      minZoom: 3,
      maxZoom: 7,
      rotateControl: true,
      styles,
      zoom,
    })

    if (viewport) mapSetup.fitBounds(viewport)

    mapController.setMap(mapSetup)
    setMap(mapSetup)
    dispatch(GeoActions.setMapAvailability(true))
  }, [countryIso, dispatch, map, ref, viewport, zoom])

  // Move and center the map to the new country location.
  useEffect(() => {
    if (!map || !countryIso) return

    getCountryBounds(countryIso).then((response) => {
      if (response?.data) {
        map.panTo(response.data.centroid)
        map.fitBounds(response.data.bounds)
      }
    })
  }, [countryIso, map])

  return { map, ref }
}

export default useGeoMap

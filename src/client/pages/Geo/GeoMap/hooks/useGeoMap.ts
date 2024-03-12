import { MutableRefObject, useEffect, useRef, useState } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { GeoActions } from 'client/store/ui/geo'
import { usePrevious } from 'client/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { getCountryBounds } from 'client/pages/Geo/utils/countryBounds'
import { mapController } from 'client/utils'

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
  const previousCountryIso = usePrevious(countryIso, countryIso)

  useEffect(() => {
    if (!ref.current || map) return

    const mapSetup = new window.google.maps.Map(ref.current, {
      controlSize: 30,
      // There needs to be a default center, otherwise the map does not render
      center: { lat: 0, lng: 0 },
      disableDefaultUI: true,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
      },
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID],
        position: google.maps.ControlPosition.TOP_CENTER,
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      },
      mapTypeId: google.maps.MapTypeId.HYBRID,
      rotateControl: true,
      zoom,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
      },
    })

    if (viewport) mapSetup.fitBounds(viewport)

    mapController.setMap(mapSetup)
    setMap(mapSetup)
    dispatch(GeoActions.setMapAvailability(true))

    getCountryBounds(countryIso).then((response) => {
      if (response?.data) {
        mapSetup.panTo(response.data.centroid)
        mapSetup.fitBounds(response.data.bounds)
      }
    })
  }, [countryIso, dispatch, map, ref, viewport, zoom])

  // Move and center the map to the new country location.
  useEffect(() => {
    if (countryIso === previousCountryIso) return
    if (!map) return

    getCountryBounds(countryIso).then((response) => {
      if (response?.data) {
        map.panTo(response.data.centroid)
        map.fitBounds(response.data.bounds)
      }
    })
  }, [countryIso, previousCountryIso, map])

  return { map, ref }
}

export default useGeoMap

import { MutableRefObject, useEffect, useRef, useState } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoMapOptions } from 'client/store/ui/geo'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { mapController } from 'client/utils'

import { styles } from './styles'

type Props = {
  viewport: google.maps.LatLngBoundsLiteral | null
}

type Returned = {
  ref: MutableRefObject<HTMLDivElement>
  map: google.maps.Map
}

const baseMapOptions = {
  center: { lat: 0, lng: 0 },
  disableDefaultUI: true,
  fullscreenControl: false,
  mapTypeControl: false,
  rotateControl: false,
  styles,
}

export const useGeoMap = (props: Props): Returned => {
  const { viewport } = props

  const dispatch = useAppDispatch()
  const { mapTypeId, maxZoom, minZoom, zoom } = useGeoMapOptions()

  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  const { countryIso } = useCountryRouteParams<CountryIso>()

  useEffect(() => {
    if (!ref.current || map) return

    const mapSetup = new window.google.maps.Map(ref.current, { ...baseMapOptions, mapTypeId, minZoom, maxZoom, zoom })

    if (viewport) mapSetup.fitBounds(viewport)

    mapController.setMap(mapSetup)
    setMap(mapSetup)
    dispatch(GeoActions.setMapAvailability(true))
  }, [countryIso, dispatch, map, mapTypeId, maxZoom, minZoom, ref, viewport, zoom])

  // Move and center the map to the new country location.
  useEffect(() => {
    if (!map || !countryIso) return
    mapController.panToCountry(countryIso)
  }, [countryIso, map])

  return { map, ref }
}

export default useGeoMap

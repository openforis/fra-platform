import { MutableRefObject, useEffect, useRef, useState } from 'react'

type Returned = {
  map: google.maps.Map
  ref: MutableRefObject<HTMLDivElement>
}

const baseMapOptions = {
  center: { lat: 0, lng: 0 },
  disableDefaultUI: true,
  fullscreenControl: false,
  mapTypeControl: false,
  mapTypeId: 'roadmap',
  maxZoom: 15,
  minZoom: 3,
  rotateControl: false,
  zoom: 3,
}

export const useLatestActivitiesMap = (): Returned => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  useEffect(() => {
    if (!ref.current || map) return

    const mapSetup = new window.google.maps.Map(ref.current, baseMapOptions)

    setMap(mapSetup)
  }, [map, ref])

  return { map, ref }
}

export default useLatestActivitiesMap

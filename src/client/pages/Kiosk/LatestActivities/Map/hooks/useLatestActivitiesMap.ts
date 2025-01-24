import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

import { Activity } from 'client/pages/Kiosk/LatestActivities/types'

type Returned = {
  addMarkers: (activities: Array<Activity>) => void
  map: google.maps.Map
  ref: MutableRefObject<HTMLDivElement>
}

const baseMapOptions = {
  center: { lat: 0, lng: 0 },
  disableDefaultUI: true,
  fullscreenControl: false,
  mapId: 'DEMO_MAP_ID', // Enables advanced markers
  mapTypeControl: false,
  mapTypeId: 'roadmap',
  maxZoom: 15,
  minZoom: 3,
  rotateControl: false,
  zoom: 3,
}

const _formatDateHeader = (date: string, countryName: string): string => {
  const parsedDate = new Date(date)
  const month = parsedDate.toLocaleString('en-US', { month: 'long' })
  const year = parsedDate.getFullYear()
  return `${month} ${year} - ${countryName}`
}

export const useLatestActivitiesMap = (): Returned => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  useEffect(() => {
    if (!ref.current || map) return

    const mapSetup = new window.google.maps.Map(ref.current, baseMapOptions)

    setMap(mapSetup)
  }, [map, ref])

  const addMarkers = useCallback<Returned['addMarkers']>(
    (activities: Array<Activity>) => {
      if (!map) return

      activities.forEach((activity) => {
        const { countryName, date, description, lat, lng } = activity

        const pin = new google.maps.marker.PinElement({
          background: '#ef7a2d',
          borderColor: '#d96010',
          glyphColor: '#d96010',
          scale: 1.5,
        })

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat, lng },
          content: pin.element,
        })

        const infoWindow = new google.maps.InfoWindow({
          content: description,
          headerContent: _formatDateHeader(date, countryName),
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })

        google.maps.event.addListener(map, 'click', () => {
          infoWindow.close()
        })
      })
    },
    [map]
  )

  return { addMarkers, map, ref }
}

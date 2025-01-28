import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

import { Activity } from 'meta/kiosk'

type Props = {
  expandedActivity: string | null
  handleExpand: (activity: Activity, map: google.maps.Map) => void
}

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
  mapTypeId: 'satellite',
  maxZoom: 15,
  minZoom: 3,
  rotateControl: false,
  zoom: 3,
}

const inActiveMarkerColors = {
  background: '#9e9e9e',
  borderColor: '#7e7e7e',
  glyphColor: '#bdbdbd',
}

const activeMarkerColors = {
  background: '#5aa955',
  borderColor: '#388e3c',
  glyphColor: '#388e3c',
}

export const useLatestActivitiesMap = (props: Props): Returned => {
  const { expandedActivity, handleExpand } = props

  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const markersRef = useRef<Map<string, google.maps.marker.AdvancedMarkerElement>>(new Map())

  useEffect(() => {
    if (!ref.current || map) return

    const mapSetup = new window.google.maps.Map(ref.current, baseMapOptions)

    setMap(mapSetup)
  }, [map, ref])

  const addMarkers = useCallback<Returned['addMarkers']>(
    (activities: Array<Activity>) => {
      if (!map) return

      const markers = markersRef.current

      activities.forEach((activity) => {
        const { id, lat, lng } = activity

        const pin = new google.maps.marker.PinElement({
          ...inActiveMarkerColors,
          scale: 2.5,
        })

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat, lng },
          content: pin.element,
        })

        marker.addListener('click', () => {
          handleExpand(activity, map)
        })

        markers.set(id, marker)
      })
    },
    [handleExpand, map]
  )

  useEffect(() => {
    const markers = markersRef.current

    markers.forEach((marker, id) => {
      const isActive = id === expandedActivity
      const colors = isActive ? activeMarkerColors : inActiveMarkerColors
      const pin = new google.maps.marker.PinElement({
        ...colors,
        scale: 2.5,
      })

      Object.assign(marker, { content: pin.element })
    })
  }, [expandedActivity])

  return { addMarkers, map, ref }
}

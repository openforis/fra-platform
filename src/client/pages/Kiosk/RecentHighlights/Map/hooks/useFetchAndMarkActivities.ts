import { useEffect, useState } from 'react'

import axios from 'axios'
import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Activity } from 'meta/kiosk'

type Props = {
  addMarkers: (activities: Array<Activity>) => void
  map: google.maps.Map
}

type Returned = {
  data: Array<Activity>
  error: string | null
  isLoading: boolean
}

export const useFetchAndMarkActivities = (props: Props): Returned => {
  const { addMarkers, map } = props

  const [data, setData] = useState<Array<Activity> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [markersAdded, setMarkersAdded] = useState(false)

  useEffect(() => {
    if (!Objects.isNil(data) || isLoading || !Objects.isNil(error)) return

    const fetchLatestActivities = async (): Promise<void> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get<Array<Activity>>(ApiEndPoint.Kiosk.latestActivities(), {
          responseType: 'json',
        })

        setData(response.data)
      } catch (_err: unknown) {
        setError('There was a problem while getting the latest activities.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestActivities()
  }, [data, error, isLoading])

  useEffect(() => {
    if (markersAdded || Objects.isNil(data) || !Objects.isFunction(addMarkers) || !map) return

    addMarkers(data)
    setMarkersAdded(true)
  }, [addMarkers, data, map, markersAdded])

  return { data, error, isLoading }
}

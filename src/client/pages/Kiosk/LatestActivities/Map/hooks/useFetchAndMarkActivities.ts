import { useEffect, useState } from 'react'

import axios from 'axios'
import Papa from 'papaparse'
import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'

import { Activity } from 'client/pages/Kiosk/LatestActivities/types'

type Props = {
  addMarkers: (activities: Array<Activity>) => void
  map: google.maps.Map
}

export const useFetchAndMarkActivities = (props: Props) => {
  const { addMarkers, map } = props

  const [data, setData] = useState<Array<Activity> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [markersAdded, setMarkersAdded] = useState(false)

  useEffect(() => {
    if (!Objects.isNil(data) || isLoading || !Objects.isNil(error)) return

    const fetchCSVData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get(ApiEndPoint.Kiosk.latestActivities(), {
          responseType: 'text',
        })

        Papa.parse(response.data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const activities: Array<Activity> = result.data.map((row: any) => ({
              countryIso: row.ISO3,
              countryName: row.Country,
              date: row['Date (YYYY-MM-DD)'],
              description: row.Description,
              lat: parseFloat(row['Location (lat)']),
              lng: parseFloat(row['Location (long)']),
            }))

            setData(activities)
          },
        })
      } catch (_err: unknown) {
        setError('There was a problem while getting the latest activities.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCSVData()
  }, [data, error, isLoading])

  useEffect(() => {
    if (markersAdded || Objects.isNil(data) || !Objects.isFunction(addMarkers) || !map) return

    addMarkers(data)
    setMarkersAdded(true)
  }, [addMarkers, data, map, markersAdded])

  return { data, error, isLoading }
}

import { useEffect, useState } from 'react'

import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { ForestEstimations } from '@meta/geo'

import { useCountryIso } from '@client/hooks'
import { useRecipeLayerPropertyName } from '@client/pages/Geo/GeoMap/hooks'
import { builForestEstimationsDataTable } from '@client/pages/Geo/utils/forestEstimations'

export const useEstimationsData = () => {
  const year = 2020 // Default value is 2020 for now
  const countryIso = useCountryIso()
  const recipeLayerName = useRecipeLayerPropertyName()
  const [fetchedData, setFetchedData] = useState(null)
  const [tabularEstimationData, setTabularEstimationData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const getForestEstimationData = async (countryIso: string, year: number): Promise<ForestEstimations> => {
      const response = await axios.get(ApiEndPoint.Geo.Estimations.forest(), { params: { countryIso, year } })
      const fetchedForestEstimations: ForestEstimations = response.data
      if (!fetchedForestEstimations) throw Error('Data unavailable.')
      return fetchedForestEstimations
    }
    setIsLoading(true)
    getForestEstimationData(countryIso, year)
      .then((fetchedForestEstimations) => {
        setFetchedData(fetchedForestEstimations)
      })
      .catch((err: Error) => {
        setTabularEstimationData([])
        setError(err.message)
        setIsLoading(false)
      })
  }, [countryIso, year])

  useEffect(() => {
    if (!fetchedData) return
    setIsLoading(true)
    setError(null)
    let data: [string, number, number][] = []
    try {
      data = builForestEstimationsDataTable(fetchedData, recipeLayerName)
    } catch (error) {
      setTabularEstimationData([])
      setError(error.message)
    }
    setTabularEstimationData(data)
    setIsLoading(false)
  }, [fetchedData, recipeLayerName])

  return { tabularEstimationData, isLoading, error, countryIso, year }
}
export default useEstimationsData

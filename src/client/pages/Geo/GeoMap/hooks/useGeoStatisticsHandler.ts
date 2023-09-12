import { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoStatistics } from 'client/store/ui/geo'
import { getForestEstimationData } from 'client/store/ui/geo/actions'
import { useCountryIso } from 'client/hooks'
import { useRecipeLayerPropertyName } from 'client/pages/Geo/GeoMap/hooks'
import { builForestEstimationsDataTable } from 'client/pages/Geo/utils/forestEstimations'

export const useGeoStatisticsHandler = () => {
  const dispatch = useAppDispatch()
  const geoStatistics = useGeoStatistics()
  const year = 2020 // Default value is 2020 for now
  const countryIso = useCountryIso()
  const recipeLayerName = useRecipeLayerPropertyName()

  useEffect(() => {
    dispatch(getForestEstimationData({ countryIso, year }))
  }, [countryIso, year, dispatch])

  useEffect(() => {
    if (!geoStatistics.forestEstimations) return
    let data: [string, number, number][] = []
    try {
      data = builForestEstimationsDataTable(geoStatistics.forestEstimations, recipeLayerName)
    } catch (error) {
      dispatch(GeoActions.setEstimationsError(error.message))
    }
    dispatch(GeoActions.setTabularEstimationData(data))
  }, [geoStatistics.forestEstimations, recipeLayerName, dispatch])
}
export default useGeoStatisticsHandler

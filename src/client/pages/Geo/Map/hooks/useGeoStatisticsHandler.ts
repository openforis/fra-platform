import { useEffect } from 'react'

import { ForestEstimationEntry } from 'meta/geo/geoStatistics'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoStatistics } from 'client/store/ui/geo'
import { getForestEstimationData } from 'client/store/ui/geo/actions'
import { useCountryIso } from 'client/hooks'
import { useLanguage } from 'client/hooks/useLanguage'
import { builForestEstimationsDataTable } from 'client/pages/Geo/utils/forestEstimations'

type Props = {
  year: number
}

export const useGeoStatisticsHandler = (props: Props) => {
  const { year } = props

  const dispatch = useAppDispatch()
  const geoStatistics = useGeoStatistics()
  const countryIso = useCountryIso()
  const language = useLanguage()

  useEffect(() => {
    dispatch(getForestEstimationData({ countryIso, year }))
  }, [countryIso, dispatch, year])

  useEffect(() => {
    if (!geoStatistics.forestEstimations) return
    let data: Array<ForestEstimationEntry> = []

    const buildDataTable = async () => {
      try {
        data = await builForestEstimationsDataTable(geoStatistics.forestEstimations, language)
        dispatch(GeoActions.setTabularForestEstimations(data))
      } catch (error) {
        dispatch(GeoActions.setEstimationsError(error.message))
      }
    }
    buildDataTable()
  }, [dispatch, geoStatistics.forestEstimations, language])
}
export default useGeoStatisticsHandler

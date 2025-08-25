import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { GeoStatisticsActions } from 'client/store/geo/statistics/actions'
import { useGeoStatistics } from 'client/store/geo/statistics/hooks/statistics'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryIso } from 'client/hooks'
import { buildForestEstimationsDataTable } from 'client/pages/Geo/utils/forestEstimations'

type Props = {
  year: number
}

export const useGeoStatisticsHandler = (props: Props): void => {
  const { year } = props

  const dispatch = useAppDispatch()
  const { forestEstimations, loading } = useGeoStatistics()
  const countryIso = useCountryIso()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(GeoStatisticsActions.getForestEstimations({ countryIso, year }))
  }, [countryIso, dispatch, year])

  useEffect(() => {
    if (loading) return

    if (Objects.isEmpty(forestEstimations)) {
      dispatch(GeoStatisticsActions.setEstimationsErrorKey(t('geo.error.statistics.dataUnavailable')))
      return
    }
    const forestEstimationsTableData = buildForestEstimationsDataTable(forestEstimations)
    dispatch(GeoStatisticsActions.setForestEstimationsTableData({ forestEstimationsTableData }))
  }, [dispatch, forestEstimations, loading, t])
}
export default useGeoStatisticsHandler

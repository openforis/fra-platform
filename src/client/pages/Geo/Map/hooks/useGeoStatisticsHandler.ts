import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoStatistics } from 'client/store/ui/geo'
import { getForestEstimationData } from 'client/store/ui/geo/actions'
import { useCountryIso } from 'client/hooks'
import { buildForestEstimationsDataTable } from 'client/pages/Geo/utils/forestEstimations'

type Props = {
  year: number
}

export const useGeoStatisticsHandler = (props: Props) => {
  const { year } = props

  const dispatch = useAppDispatch()
  const { forestEstimations, isLoading } = useGeoStatistics()
  const countryIso = useCountryIso()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(getForestEstimationData({ countryIso, year }))
  }, [countryIso, dispatch, year])

  useEffect(() => {
    if (isLoading) return

    if (Objects.isEmpty(forestEstimations)) {
      dispatch(GeoActions.setEstimationsError(t('geo.error.statistics.dataUnavailable')))
      return
    }
    const data = buildForestEstimationsDataTable(forestEstimations)
    dispatch(GeoActions.setTabularForestEstimations(data))
  }, [dispatch, forestEstimations, isLoading, t])
}
export default useGeoStatisticsHandler

import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { OriginalDataPointActions } from 'client/store/data/originalDataPoint/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Props = {
  originalDataPoint: OriginalDataPoint
}

type Returned = (dataSourcesUpdate: Array<DataSource>) => void

type PropsUpdate = Parameters<typeof OriginalDataPointActions.updateOriginalDataPointDataSources>[0]

export const useUpdateDataSources = (props: Props): Returned => {
  const { originalDataPoint } = props

  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useCallback<Returned>(
    (dataSourcesUpdate) => {
      const odpUpdate: OriginalDataPoint = { ...originalDataPoint, dataSources: dataSourcesUpdate }

      const propsUpdate: PropsUpdate = { assessmentName, countryIso, cycleName, originalDataPoint: odpUpdate }
      dispatch(OriginalDataPointActions.updateOriginalDataPointDataSources(propsUpdate))
    },
    [assessmentName, countryIso, cycleName, dispatch, originalDataPoint]
  )
}

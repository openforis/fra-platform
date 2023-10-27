import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data/slice'
import { useCanEdit } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { Props } from './props'
import { useDependencies } from './useDependencies'

export const useGetData = (props: Props) => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const canEdit = useCanEdit(sectionName)
  const dependencies = useDependencies(props)

  useEffect(() => {
    const { tableNames, tableWithOdp } = dependencies
    if (tableNames.length > 0) {
      const propsFetch = { assessmentName, cycleName, countryIso: countryIso as CountryIso }

      dispatch(DataActions.getTableData({ ...propsFetch, tableNames }))

      if (tableWithOdp && canEdit) {
        dispatch(DataActions.getNodeValuesEstimations({ ...propsFetch, sectionName, tableName: tableWithOdp }))
        dispatch(DataActions.getODPLastUpdatedTimestamp({ ...propsFetch, sectionName }))
      }
    }
  }, [assessmentName, canEdit, countryIso, cycleName, dependencies, dispatch, sectionName])
}

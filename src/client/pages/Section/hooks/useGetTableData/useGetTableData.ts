import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { AssessmentActions } from 'client/store/assessment'
import { DataActions } from 'client/store/data/slice'
import { useCanEdit } from 'client/store/user'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { Props } from './props'
import { useDependencies } from './useDependencies'

export const useGetTableData = (props: Props) => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const canEdit = useCanEdit(sectionName)
  const { print } = useIsPrintRoute()
  const dependencies = useDependencies(props)

  useEffect(() => {
    const { external, internal } = dependencies
    const { tableNames, tableWithOdp } = internal
    if (!print) {
      // fetch internal dependencies
      if (tableNames.size > 0) {
        const propsFetch = { assessmentName, cycleName, countryIso, mergeOdp: !tableWithOdp }

        dispatch(DataActions.getTableData({ ...propsFetch, tableNames: Array.from(tableNames) }))

        if (tableWithOdp && canEdit) {
          dispatch(DataActions.getNodeValuesEstimations({ ...propsFetch, sectionName, tableName: tableWithOdp }))
          dispatch(DataActions.getODPLastUpdatedTimestamp({ ...propsFetch, sectionName }))
        }
      }

      // fetch external dependencies
      const auth = { assessmentName, cycleName }
      Object.entries(external).forEach(([assessmentName, cycleDependencies]) => {
        Object.entries(cycleDependencies).forEach(([cycleName, tableNames]) => {
          const propsFetch = { assessmentName, cycleName, countryIso, mergeOdp: true, auth }
          dispatch(DataActions.getTableData({ ...propsFetch, tableNames: Array.from(tableNames) }))

          dispatch(AssessmentActions.getMetaCache({ assessmentName, cycleName }))
        })
      })
    }
  }, [assessmentName, canEdit, countryIso, cycleName, dependencies, dispatch, print, sectionName])
}

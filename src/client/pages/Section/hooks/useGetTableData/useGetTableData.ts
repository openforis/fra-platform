import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { EstimationsActions } from 'client/store/data/tableData/estimations/actions'
import { NodeValuesActions } from 'client/store/data/tableData/nodeValues/actions'
import { useAppDispatch } from 'client/store/hooks'
import { MetaActions } from 'client/store/meta/actions'
import { useCanEdit } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'

import { Props } from './props'
import { useDependencies } from './useDependencies'

export const useGetTableData = (props: Props): void => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
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

        dispatch(NodeValuesActions.getTableData({ ...propsFetch, tableNames: Array.from(tableNames) }))

        if (tableWithOdp && canEdit) {
          dispatch(EstimationsActions.getNodeValuesEstimations({ ...propsFetch, sectionName, tableName: tableWithOdp }))
        }
      }

      // fetch external dependencies
      const auth = { assessmentName, cycleName }
      Object.entries(external).forEach(([assessmentName, cycleDependencies]) => {
        Object.entries(cycleDependencies).forEach(([cycleName, tableNames]) => {
          const propsFetch = { assessmentName, cycleName, countryIso, mergeOdp: true, auth }
          dispatch(NodeValuesActions.getTableData({ ...propsFetch, tableNames: Array.from(tableNames) }))

          dispatch(MetaActions.getMetaCache({ assessmentName, cycleName }))
        })
      })
    }
  }, [assessmentName, canEdit, countryIso, cycleName, dependencies, dispatch, print, sectionName])
}

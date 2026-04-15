import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { EstimationsActions } from 'client/store/data/tableData/estimations/actions'
import { NodeValuesActions } from 'client/store/data/tableData/nodeValues/actions'
import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
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
    const { tableNames: tableNamesSet, tableWithOdp } = internal

    if (!print) {
      // fetch internal dependencies
      if (tableNamesSet.size > 0) {
        const propsFetch = { assessmentName, cycleName, countryIso, mergeOdp: !tableWithOdp }
        const tableNames = Array.from(tableNamesSet)

        dispatch(NodeValuesActions.getTableData({ ...propsFetch, tableNames }))

        if (canEdit) {
          dispatch(
            ValidationsActions.getTableValidations({ assessmentName, cycleName, countryIso, sectionName, tableNames })
          )
        }

        if (tableWithOdp && canEdit) {
          dispatch(EstimationsActions.getNodeValuesEstimations({ ...propsFetch, sectionName, tableName: tableWithOdp }))
        }
      }

      // fetch external dependencies
      const auth = { assessmentName, cycleName }
      Object.entries(external).forEach(([assessmentName, cycleDependencies]) => {
        Object.entries(cycleDependencies).forEach(([cycleName, tableNamesSet]) => {
          const propsFetch = { assessmentName, cycleName, countryIso, mergeOdp: true, auth }
          const tableNames = Array.from(tableNamesSet)

          dispatch(NodeValuesActions.getTableData({ ...propsFetch, tableNames }))

          dispatch(MetaActions.getMetaCache({ assessmentName, cycleName }))
        })
      })
    }
  }, [assessmentName, canEdit, countryIso, cycleName, dependencies, dispatch, print, sectionName])
}

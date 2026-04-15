import { useEffect } from 'react'

import { CountryIso } from 'meta/area/countryIso'

import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCanEdit } from 'client/store/user/hooks/auth'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'

import { Props } from './props'
import { useDependencies } from './useDependencies'

export const useGetTableValidations = (props: Props): void => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEdit = useCanEdit(sectionName)
  const { print } = useIsPrintRoute()
  const dependencies = useDependencies(props)

  useEffect(() => {
    const { internal } = dependencies
    const { tableNames: tableNamesSet } = internal

    if (print || !canEdit || tableNamesSet.size === 0) {
      return
    }

    const tableNames = Array.from(tableNamesSet)

    dispatch(ValidationsActions.getTableValidations({ assessmentName, cycleName, countryIso, sectionName, tableNames }))
  }, [assessmentName, canEdit, countryIso, cycleName, dependencies, dispatch, print, sectionName])
}

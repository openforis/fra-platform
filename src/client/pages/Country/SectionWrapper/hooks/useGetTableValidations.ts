import { useEffect, useMemo } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { TableName } from 'meta/assessment/table'
import { Objects } from 'utils/objects'

import { ValidationsActions } from 'client/store/data/tableData/validations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useTableSections } from 'client/store/meta/hooks/tableSections'
import { useCanEdit } from 'client/store/user/hooks/auth'
import { useIsDataExportView } from 'client/hooks/dataExport'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'

import { Props } from './props'

export const useGetTableValidations = (props: Props): void => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const canEdit = useCanEdit(sectionName)
  const isDataExportView = useIsDataExportView()
  const { print } = useIsPrintRoute()
  const tableSections = useTableSections({ sectionName })

  const tableNames = useMemo<Array<TableName>>(
    () => tableSections.flatMap((tableSection) => tableSection.tables.map((table) => table.props.name)),
    [tableSections]
  )

  useEffect(() => {
    if (isDataExportView || print || !canEdit || Objects.isEmpty(tableNames)) {
      return
    }

    dispatch(ValidationsActions.getTableValidations({ assessmentName, cycleName, countryIso, sectionName, tableNames }))
  }, [assessmentName, canEdit, countryIso, cycleName, dispatch, isDataExportView, print, sectionName, tableNames])
}

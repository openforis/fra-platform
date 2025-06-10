import { useEffect, useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { TableName, TableNames } from 'meta/assessment/table'

import { NodeValuesActions } from 'client/store/data/tableData/nodeValues/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useTableSectionsCycle } from 'client/store/meta/hooks/tableSections'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useGetTableData = () => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const tableSections = useTableSectionsCycle()

  const tableNames = useMemo<Array<TableName>>(
    () =>
      tableSections.reduce<Array<TableName>>((acc, tableSection) => {
        tableSection.tables.forEach((table) => {
          acc.push(table.props.name)
          if (table.props.name === TableNames.extentOfForest) {
            acc.push(TableNames.originalDataPointValue)
          }
        })
        return acc
      }, []),
    [tableSections]
  )

  useEffect(() => {
    if (tableNames.length > 0) {
      const propsFetch = { assessmentName, cycleName, countryIso, tableNames }
      dispatch(NodeValuesActions.getTableData(propsFetch))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, tableNames])
}

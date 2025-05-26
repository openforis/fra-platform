import { useEffect, useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { TableName, TableNames } from 'meta/assessment/table'

import { DataActions } from 'client/store/data'
import { useAppDispatch } from 'client/store/hooks'
import { useTableSectionsCycle } from 'client/store/metadata'
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
      dispatch(DataActions.getTableData(propsFetch))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, tableNames])
}

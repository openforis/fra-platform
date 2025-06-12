import { useEffect, useState } from 'react'

import { isAnyOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { TableName } from 'meta/assessment/table'

import { NodeValuesActions } from 'client/store/data/tableData/nodeValues/actions'
import { useAppDispatch } from 'client/store/hooks'
import { addAppListener } from 'client/store/middleware/listener'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Returned = {
  someTableFetching: boolean
}

export const useTableDataStatusListener = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  const [fetchingStatus, setFetchingStatus] = useState<Record<TableName, boolean>>({})

  useEffect(() => {
    setFetchingStatus({})

    const matcher = isAnyOf(
      isPending(NodeValuesActions.getTableData),
      isFulfilled(NodeValuesActions.getTableData),
      isRejected(NodeValuesActions.getTableData)
    )

    const listener = dispatch(
      addAppListener({
        matcher,
        effect: (action) => {
          const {
            meta: { arg },
          } = action

          const { tableNames } = arg
          const isActionPending = isPending(action)

          setFetchingStatus((currentStatus) => {
            const newStatus = { ...currentStatus }
            tableNames.forEach((tableName: TableName) => {
              newStatus[tableName] = isActionPending
            })
            return newStatus
          })
        },
      })
    )

    return () => {
      listener()
    }
  }, [assessmentName, countryIso, cycleName, dispatch])

  const someTableFetching = Object.values(fetchingStatus).some((isFetching) => isFetching)

  return { someTableFetching }
}

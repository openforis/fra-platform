import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { createSortFn } from './createSortFn'
import { SortOrder, SortState } from './types'

interface Props {
  rowsData: Array<Row>
  data: RecordAssessmentData
  table: Table
  sortState: SortState
}

export const useSortedRowsData = (props: Props) => {
  const { data, rowsData, sortState, table } = props
  const tableName = table.props.name

  const { assessmentName, countryIso } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()

  const sortedRowsData = useMemo(() => {
    // If no sorting, return the original order
    if (sortState.order === SortOrder.NONE || !sortState.colName) return rowsData

    const clonedRows = Objects.cloneDeep(rowsData)

    const _sortFn = createSortFn({
      assessmentName,
      colName: sortState.colName,
      countryIso,
      cycle,
      data,
      sortOrder: sortState.order,
      tableName,
    })

    return clonedRows.sort(_sortFn)
  }, [assessmentName, countryIso, cycle, data, rowsData, sortState.colName, sortState.order, tableName])

  return sortedRowsData
}

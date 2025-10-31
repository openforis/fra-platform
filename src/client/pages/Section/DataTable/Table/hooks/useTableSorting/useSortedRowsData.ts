import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/routeParams'

import { createSortFn } from './createSortFn'
import { SortOrder, SortState } from './types'

interface Props {
  rowsData: Array<Row>
  data: RecordAssessmentData
  table: Table
  sortState: SortState
}

export const useSortedRowsData = (props: Props): Array<Row> => {
  const { data, rowsData, sortState, table } = props

  const { assessmentName, countryIso } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()

  const { colName } = sortState
  const sortedRowsData = useMemo(() => {
    // If no sorting, return the original order
    if (sortState.order === SortOrder.NONE || !colName) return rowsData

    const clonedRows = Objects.cloneDeep(rowsData)

    const params = { assessmentName, colName, countryIso, cycle, data, sortOrder: sortState.order, table }
    const _sortFn = createSortFn(params)

    return clonedRows.sort(_sortFn)
  }, [assessmentName, colName, countryIso, cycle, data, rowsData, sortState.order, table])

  return sortedRowsData
}

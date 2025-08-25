import { useState } from 'react'

import { ColName } from 'meta/assessment/col'
import { Row } from 'meta/assessment/row'

import { PropsSort, SortOrder, SortState } from './types'
import { useHandleSort } from './useHandleSort'
import { useSortedRowsData } from './useSortedRowsData'

export * from './types'

type Returned = {
  sortState: SortState
  sortedRowsData: Array<Row>
  handleSort: (colName: ColName) => void
}

export const useTableSorting = (props: PropsSort): Returned => {
  const [sortState, setSortState] = useState<SortState>({ colName: null, order: SortOrder.NONE })

  const handleSort = useHandleSort({ setSortState })
  const sortedRowsData = useSortedRowsData({ ...props, sortState })

  return {
    sortState,
    sortedRowsData,
    handleSort,
  }
}

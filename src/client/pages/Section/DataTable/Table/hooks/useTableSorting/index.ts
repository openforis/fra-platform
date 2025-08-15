import { useState } from 'react'

import { Props, SortOrder, SortState } from './types'
import { useHandleSort } from './useHandleSort'
import { useSortedRowsData } from './useSortedRowsData'

export * from './types'

export const useTableSorting = (props: Props) => {
  const [sortState, setSortState] = useState<SortState>({ colName: null, order: SortOrder.NONE })

  const handleSort = useHandleSort({ setSortState })
  const sortedRowsData = useSortedRowsData({ ...props, sortState })

  return {
    sortState,
    sortedRowsData,
    handleSort,
  }
}

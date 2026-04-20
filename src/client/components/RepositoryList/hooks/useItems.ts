import { useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import { useInjectSlice } from 'client/store/hooks'
import { useTablePaginatedData } from 'client/store/tablePaginated/hooks/tablePaginated'
import { TablePaginatedSlice } from 'client/store/tablePaginated/slice'

import { useFilterFn } from './_useFilterFn'
import { useSortFn } from './_useSortFn'

type Returned = {
  isLoading: boolean
  items: Array<RepositoryItemTree>
}

export const useItems = (isGlobal = false): Returned => {
  useInjectSlice(TablePaginatedSlice)

  const path = `${ApiEndPoint.CycleData.Repository.many()}?global=${isGlobal}`
  const storeItems = useTablePaginatedData<RepositoryItemTree>({ path })
  const rawItems = useMemo(() => storeItems ?? [], [storeItems])

  const sortFn = useSortFn(path)
  const filterFn = useFilterFn(path)
  const items = useMemo(() => filterFn(sortFn(rawItems)), [filterFn, rawItems, sortFn])

  return { isLoading: storeItems === undefined, items }
}

import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import { useInjectSlice } from 'client/store/hooks'
import { useTablePaginatedData } from 'client/store/tablePaginated/hooks/tablePaginated'
import { TablePaginatedSlice } from 'client/store/tablePaginated/slice'

export const useItems = (isGlobal = false): Array<RepositoryItemTree> => {
  useInjectSlice(TablePaginatedSlice)

  const path = `${ApiEndPoint.CycleData.Repository.tree()}?global=${isGlobal}`

  return useTablePaginatedData<RepositoryItemTree>({ path }) ?? []
}

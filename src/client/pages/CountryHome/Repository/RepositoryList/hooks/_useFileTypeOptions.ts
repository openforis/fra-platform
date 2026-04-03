import { useMemo } from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import { useTablePaginatedData } from 'client/store/tablePaginated/hooks/tablePaginated'
import { MultiSelectItem } from 'client/components/TablePaginated/types'

const _collectFileTypes = (items: Array<RepositoryItemTree>, acc: Set<string>): void => {
  items.forEach((item) => {
    if (item.fileType) acc.add(item.fileType)
    if (item.children) _collectFileTypes(item.children, acc)
  })
}

export const useFileTypeOptions = (path: string): Array<MultiSelectItem> => {
  const items = useTablePaginatedData<RepositoryItemTree>({ path })

  return useMemo(() => {
    const fileTypes = new Set<string>()
    _collectFileTypes(items ?? [], fileTypes)
    return Array.from(fileTypes)
      .sort()
      .map((type) => ({ label: type.toUpperCase(), value: type }))
  }, [items])
}

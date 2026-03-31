import { useMemo } from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { Lang } from 'meta/lang'
import { Objects } from 'utils/objects'

import { useTablePaginatedFilterValue } from 'client/store/tablePaginated/hooks/tablePaginated'
import { useLanguage } from 'client/hooks/language'

import { _getNameTranslation, ItemsFn } from './_utils'

const _filterByName = (items: Array<RepositoryItemTree>, filter: string, language: Lang): Array<RepositoryItemTree> => {
  const lower = filter.toLowerCase()
  return items.reduce<Array<RepositoryItemTree>>((acc, item) => {
    if (!item.folderName) {
      if (_getNameTranslation(item, language).toLowerCase().includes(lower)) acc.push(item)
      return acc
    }
    const filteredChildren = _filterByName(item.children, filter, language)
    const folderMatches = item.folderName.toLowerCase().includes(lower)
    // Note: If we match the folder, we'll show all items inside
    if (folderMatches || !Objects.isEmpty(filteredChildren))
      acc.push({ ...item, children: folderMatches ? item.children : filteredChildren })
    return acc
  }, [])
}

export const useFilterFn = (path: string): ItemsFn => {
  const nameFilter = useTablePaginatedFilterValue<string>(path, 'name')
  const language = useLanguage()

  return useMemo(() => {
    const fns: Array<ItemsFn> = []
    if (nameFilter) fns.push((items) => _filterByName(items, nameFilter, language))
    if (Objects.isEmpty(fns)) return (items) => items
    return (items) => fns.reduce<Array<RepositoryItemTree>>((acc, fn) => fn(acc), items)
  }, [language, nameFilter])
}

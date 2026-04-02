import { useMemo } from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { Lang } from 'meta/lang'
import { Objects } from 'utils/objects'

import { useTablePaginatedFilterValue } from 'client/store/tablePaginated/hooks/tablePaginated'
import { useLanguage } from 'client/hooks/language'

import { _getNameTranslation, ItemsFn } from './_utils'

const _filterByPredicate = (
  items: Array<RepositoryItemTree>,
  predicate: (item: RepositoryItemTree) => boolean
): Array<RepositoryItemTree> =>
  items.reduce<Array<RepositoryItemTree>>((acc, item) => {
    if (!item.folderName) {
      if (predicate(item)) acc.push(item)
      return acc
    }
    const filteredChildren = _filterByPredicate(item.children, predicate)
    if (!Objects.isEmpty(filteredChildren)) acc.push({ ...item, children: filteredChildren })
    return acc
  }, [])

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
  const linkedFilter = useTablePaginatedFilterValue<boolean>(path, 'linked')
  const nameFilter = useTablePaginatedFilterValue<string>(path, 'name')
  const privateFilter = useTablePaginatedFilterValue<boolean>(path, 'private')
  const publicFilter = useTablePaginatedFilterValue<boolean>(path, 'public')
  const unlinkedFilter = useTablePaginatedFilterValue<boolean>(path, 'unlinked')
  const language = useLanguage()

  return useMemo(() => {
    const fns: Array<ItemsFn> = []
    if (nameFilter) fns.push((items) => _filterByName(items, nameFilter, language))
    if (linkedFilter) fns.push((items) => _filterByPredicate(items, (item) => !!item.linked))
    if (unlinkedFilter) fns.push((items) => _filterByPredicate(items, (item) => !item.linked))
    if (publicFilter) fns.push((items) => _filterByPredicate(items, (item) => !!item.props?.public))
    if (privateFilter) fns.push((items) => _filterByPredicate(items, (item) => !item.props?.public))
    if (Objects.isEmpty(fns)) return (items) => items
    return (items) => fns.reduce<Array<RepositoryItemTree>>((acc, fn) => fn(acc), items)
  }, [language, linkedFilter, nameFilter, privateFilter, publicFilter, unlinkedFilter])
}

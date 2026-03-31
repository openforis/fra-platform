import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { Lang } from 'meta/lang'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'
import { Objects } from 'utils/objects'

import { useTablePaginatedOrderBy } from 'client/store/tablePaginated/hooks/tablePaginated'
import { useLanguage } from 'client/hooks/language'

import { _getNameTranslation, ItemsFn } from './_utils'

type SortProperty = 'name' | 'createdAt' | 'linked' | 'access'
type CompareFN = (a: RepositoryItemTree, b: RepositoryItemTree) => number

// Helper to get repository item value per property
const _getValue = (item: RepositoryItemTree, property: SortProperty, language: Lang): string | number => {
  switch (property) {
    case 'name':
      return item.folderName ?? _getNameTranslation(item, language)
    case 'createdAt':
      return item.createdAt ?? ''
    case 'linked':
      return item.linked ? 1 : 0
    case 'access':
      return item.props?.public ? 1 : 0
    default:
      return ''
  }
}

const _compareFn =
  (property: SortProperty, direction: TablePaginatedOrderByDirection, language: Lang): CompareFN =>
  (a: RepositoryItemTree, b: RepositoryItemTree): number => {
    // Folders first
    if (a.folderName && !b.folderName) return -1
    if (!a.folderName && b.folderName) return 1

    // Direction
    const multiplier = direction === TablePaginatedOrderByDirection.asc ? 1 : -1
    const aVal = _getValue(a, property, language)
    const bVal = _getValue(b, property, language)
    if (aVal < bVal) return -1 * multiplier
    if (aVal > bVal) return 1 * multiplier
    return 0
  }

const _sortItems = (
  items: Array<RepositoryItemTree>,
  property: SortProperty,
  direction: TablePaginatedOrderByDirection,
  language: Lang
): Array<RepositoryItemTree> =>
  [...items]
    .sort(_compareFn(property, direction, language))
    .map((item) =>
      Objects.isEmpty(item.children)
        ? item
        : { ...item, children: _sortItems(item.children, property, direction, language) }
    )

export const useSortFn = (path: string): ItemsFn => {
  const orderBy = useTablePaginatedOrderBy(path)
  const language = useLanguage()
  if (!orderBy?.property || !orderBy?.direction) return (items) => items
  return (items) => _sortItems(items, orderBy.property as SortProperty, orderBy.direction, language)
}

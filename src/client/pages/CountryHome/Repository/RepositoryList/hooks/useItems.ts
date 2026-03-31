import { useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { Lang } from 'meta/lang'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'
import { Translations } from 'meta/translation/translations'

import { useInjectSlice } from 'client/store/hooks'
import { useTablePaginatedData, useTablePaginatedOrderBy } from 'client/store/tablePaginated/hooks/tablePaginated'
import { TablePaginatedSlice } from 'client/store/tablePaginated/slice'
import { useLanguage } from 'client/hooks/language'

// File and link names are under translations, fallback to English label
const _getNameTranslation = (item: RepositoryItemTree, language: Lang): string => {
  if (!item.props?.translation) return ''
  const translation = Translations.getLabel({ translation: item.props.translation, language })
  const translationEn = Translations.getLabel({ translation: item.props.translation, language: Lang.en })
  return translation || translationEn
}
// Helper to get repository item value per property
type SortProperty = 'name' | 'createdAt' | 'linked' | 'access'
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

type CompareFN = (a: RepositoryItemTree, b: RepositoryItemTree) => number
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

const sortItems = (
  items: Array<RepositoryItemTree>,
  property: SortProperty,
  direction: TablePaginatedOrderByDirection,
  language: Lang
): Array<RepositoryItemTree> => {
  return [...items]
    .sort(_compareFn(property, direction, language))
    .map((item) =>
      item.children.length === 0 ? item : { ...item, children: sortItems(item.children, property, direction, language) }
    )
}

export const useItems = (isGlobal = false): Array<RepositoryItemTree> => {
  useInjectSlice(TablePaginatedSlice)

  const path = `${ApiEndPoint.CycleData.Repository.tree()}?global=${isGlobal}`
  const storeItems = useTablePaginatedData<RepositoryItemTree>({ path })
  const rawItems = useMemo(() => storeItems ?? [], [storeItems])

  const orderBy = useTablePaginatedOrderBy(path)
  const language = useLanguage()

  return useMemo(() => {
    if (!orderBy?.property || !orderBy?.direction) return rawItems
    return sortItems(rawItems, orderBy.property as SortProperty, orderBy.direction, language)
  }, [language, orderBy, rawItems])
}

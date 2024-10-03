import { TablePaginatedFilterValues, TablePaginatedOrderBy } from 'meta/tablePaginated'

import { useAppSelector } from 'client/store/store'
import { TablePaginatedSelectors } from 'client/store/ui/tablePaginated/selectors'

export const useIsTablePaginatedInitialized = (path: string): boolean =>
  useAppSelector((state) => TablePaginatedSelectors.isInitialized(state, path))

export const useTablePaginatedCount = (path: string): { total: number } =>
  useAppSelector((state) => TablePaginatedSelectors.getCount(state, path))

export const useTablePaginatedData = <Datum>(path: string): Array<Datum> | undefined =>
  useAppSelector((state) => TablePaginatedSelectors.getData(state, path) as Array<Datum> | undefined)

export const useTablePaginatedFilters = (path: string): Record<string, TablePaginatedFilterValues> | undefined =>
  useAppSelector((state) => TablePaginatedSelectors.getFilters(state, path))

export const useTablePaginatedFilterValue = <FilterValueType extends TablePaginatedFilterValues>(
  path: string,
  fieldName: string
): FilterValueType | undefined =>
  useAppSelector(
    (state) => TablePaginatedSelectors.getFilterValue(state, path, fieldName) as FilterValueType | undefined
  )

export const useTablePaginatedOrderBy = (path: string): TablePaginatedOrderBy | undefined =>
  useAppSelector((state) => TablePaginatedSelectors.getOrderBy(state, path))

export const useTablePaginatedPage = (path: string): number =>
  useAppSelector((state) => TablePaginatedSelectors.getPage(state, path))

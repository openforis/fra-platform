import { TablePaginatedFilterValues, TablePaginatedOrderBy } from 'meta/tablePaginated'

import { useAppSelector } from 'client/store/store'
import { TablePaginatedSelectors } from 'client/store/ui/tablePaginated/selectors'

export const useTablePaginatedCount = (path: string): { total: number } =>
  useAppSelector((state) => TablePaginatedSelectors.getCount(state, path))

export const useTablePaginatedData = <Datum>(path: string): Array<Datum> | undefined =>
  useAppSelector((state) => TablePaginatedSelectors.getData(state, path) as Array<Datum> | undefined)

export const useTablePaginatedFilters = (path: string): Record<string, TablePaginatedFilterValues> | undefined =>
  useAppSelector((state) => TablePaginatedSelectors.getFilters(state, path))

export const useTablePaginatedFilterValue = (path: string, fieldName: string): TablePaginatedFilterValues | undefined =>
  useAppSelector((state) => TablePaginatedSelectors.getFilterValue(state, path, fieldName))

export const useTablePaginatedOrderBy = (path: string): TablePaginatedOrderBy | undefined =>
  useAppSelector((state) => TablePaginatedSelectors.getOrderBy(state, path))

export const useTablePaginatedPage = (path: string): number =>
  useAppSelector((state) => TablePaginatedSelectors.getPage(state, path))

import { useAppSelector } from 'client/store/store'
import { TablePaginatedSelectors } from 'client/store/ui/tablePaginated/selectors'

export const useTablePaginatedCount = (path: string): { total: number } =>
  useAppSelector((state) => TablePaginatedSelectors.getCount(state, path))

export const useTablePaginatedData = <Datum>(path: string): Array<Datum> | undefined =>
  useAppSelector((state) => TablePaginatedSelectors.getData(state, path) as Array<Datum> | undefined)

export const useTablePaginatedFilters = (path: string) =>
  useAppSelector((state) => TablePaginatedSelectors.getFilters(state, path))

export const useTablePaginatedFilterValue = (path: string, fieldName: string) =>
  useAppSelector((state) => TablePaginatedSelectors.getFilterValue(state, path, fieldName))

export const useTablePaginatedOrderBy = (path: string) =>
  useAppSelector((state) => TablePaginatedSelectors.getOrderBy(state, path))

export const useTablePaginatedPage = (path: string) =>
  useAppSelector((state) => TablePaginatedSelectors.getPage(state, path))

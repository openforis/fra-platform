import { useAppSelector } from 'client/store/store'
import { TablePaginatedSelectors } from 'client/store/ui/tablePaginated/selectors'

export const useTablePaginatedCount = (path: string): { total: number } =>
  useAppSelector((state) => TablePaginatedSelectors.getCount(state, path))

export const useTablePaginatedData = <Datum>(path: string): Array<Datum> | undefined =>
  useAppSelector((state) => TablePaginatedSelectors.getData(state, path) as Array<Datum> | undefined)

export const useTablePaginatedPage = (path: string) =>
  useAppSelector((state) => TablePaginatedSelectors.getPage(state, path))

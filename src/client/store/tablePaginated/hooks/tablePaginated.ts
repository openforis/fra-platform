import { Objects } from 'utils/objects'

import { TablePaginatedCompareFn, TablePaginatedFilterValues, TablePaginatedOrderBy } from 'meta/tablePaginated'

import { useAppSelector } from 'client/store/hooks'

import { TablePaginatedSelectors } from '../selectors'

export const useIsTablePaginatedInitialized = (path: string): boolean =>
  useAppSelector((state) => TablePaginatedSelectors.isInitialized(state, path))

export const useTablePaginatedCount = (path: string): { total: number } =>
  useAppSelector((state) => TablePaginatedSelectors.getCount(state, path))

type UseTablePaginatedDataProps<Datum extends object> = {
  path: string
  compareFn?: TablePaginatedCompareFn<Datum>
  filterFn?: (datum: Datum) => boolean
}

export const useTablePaginatedData = <Datum extends object>(
  props: UseTablePaginatedDataProps<Datum>
): Array<Datum> | undefined => {
  const { compareFn, filterFn, path } = props
  let data = useAppSelector((state) => TablePaginatedSelectors.getData(state, path) as Array<Datum> | undefined)

  if (!Objects.isEmpty(data)) {
    if (!Objects.isNil(filterFn)) data = data.filter(filterFn)
    if (!Objects.isNil(compareFn)) data = [...data].sort(compareFn)
  }

  return data
}

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

import { TablePaginatedFilterValues, TablePaginatedOrderBy } from 'meta/tablePaginated'

export type TablePaginatedStateItem<Datum = Record<string, never>, Counter = never> = {
  count: { total: number } & Counter
  data: Array<Datum>
  filters: Record<string, TablePaginatedFilterValues>
  orderBy?: TablePaginatedOrderBy
  page: number
}

export type TablePaginatedState = Record<string, TablePaginatedStateItem>

export const initialState: TablePaginatedState = {}

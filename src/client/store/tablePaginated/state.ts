import { TablePaginatedFilterValues } from 'meta/tablePaginated/filters/filter'
import { TablePaginatedOrderBy } from 'meta/tablePaginated/orderBy'

export type TablePaginatedStateItem<Datum = Record<string, never>, Counter = never> = {
  count: { total: number } & Counter
  data: Array<Datum>
  filters: Record<string, TablePaginatedFilterValues>
  initialized: boolean
  orderBy?: TablePaginatedOrderBy
  page: number
}

export type TablePaginatedState = Record<string, TablePaginatedStateItem>

export const initialState: TablePaginatedState = {}

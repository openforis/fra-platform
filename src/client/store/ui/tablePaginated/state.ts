export type TablePaginatedStateItem<Datum = Record<string, never>, Counter = never> = {
  count: { total: number } & Counter
  data: Array<Datum>
  page: number
}

export type TablePaginatedState = Record<string, TablePaginatedStateItem>

export const initialState: TablePaginatedState = {}

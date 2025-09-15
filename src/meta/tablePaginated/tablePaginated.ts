export enum TablePaginatedOrderByDirection {
  asc = 'asc',
  desc = 'desc',
}

export type TablePaginatedOrderBy = {
  direction?: TablePaginatedOrderByDirection
  property?: string
}

export type TablePaginatedCount = {
  total: number
}

export enum TablePaginatedFilterType {
  COUNTRY = 'country',
  MULTI_SELECT = 'multi_select',
  SWITCH = 'switch',
  TEXT = 'text',
}

export type TablePaginatedFilterValues = boolean | string | Array<string>

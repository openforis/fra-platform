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

import React from 'react'

import { TablePaginatedCount } from 'meta/tablePaginated'

export type ColumnComponentProps<Datum> = {
  datum: Datum
  rowIndex: number
}

export type Column<Datum> = {
  component: React.FC<ColumnComponentProps<Datum>>
  header?: string | React.FC
  key: string
  orderByProperty?: string
}

export type Props<Datum> = {
  columns: Array<Column<Datum>>
  path: string
  limit?: number
}

export type TablePaginatedCounterComponent = React.FC<{ count: TablePaginatedCount }>

export type TablePaginatedCounter = {
  show: boolean
  Component?: TablePaginatedCounterComponent
}

export type TablePaginatedSkeleton = {
  baseColor: string
  highlightColor: string
  Component: React.FC
}

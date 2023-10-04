import React from 'react'

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

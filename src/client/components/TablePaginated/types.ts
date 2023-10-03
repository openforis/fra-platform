import React from 'react'

export type Column<Datum> = {
  component: React.FC<{ datum: Datum }>
  header?: string | React.FC
  key: string
  orderByProperty?: string
}

export type Props<Datum> = {
  EmptyListComponent?: React.FC
  columns: Array<Column<Datum>>
  path: string
  limit?: number
}

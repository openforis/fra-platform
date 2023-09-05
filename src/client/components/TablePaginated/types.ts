import React from 'react'

export type Column<Datum> = {
  component: React.FC<{ datum: Datum }>
  header: string | React.FC
  key: string
}

export type Props<Datum> = {
  columns: Array<Column<Datum>>
  path: string
}

import { MutableRefObject } from 'react'

import { Table } from 'meta/assessment/table'

export type CopyValuesProps = {
  gridRef: MutableRefObject<HTMLDivElement>
  table: Table
}

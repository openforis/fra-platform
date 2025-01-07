import { MutableRefObject } from 'react'

import { Table } from 'meta/assessment'

export type CopyValuesProps = {
  gridRef: MutableRefObject<HTMLDivElement>
  table: Table
}

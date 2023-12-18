import { ColumnNodeExt, SelectableColumnNode } from '../types'

export type CellProps<Column = ColumnNodeExt> = {
  disabled: boolean
  column: Column
}

export type CellValueMultiProps = CellProps<SelectableColumnNode> & {
  value: Array<string>
  onChange: (newValue: Array<string>) => void
}

export type CellValueSingleProps = CellProps & {
  value: string
  onChange: (newValue: string) => void
}

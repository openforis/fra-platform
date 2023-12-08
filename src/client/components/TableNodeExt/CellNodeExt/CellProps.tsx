import { ColumnNodeExt } from '../types'

export type CellProps = {
  disabled: boolean
  column: ColumnNodeExt
}

export type CellValueMultiProps = CellProps & {
  value: Array<string>
  onChange: (newValue: Array<string>) => void
}

export type CellValueSingleProps = CellProps & {
  value: string
  onChange: (newValue: string) => void
}

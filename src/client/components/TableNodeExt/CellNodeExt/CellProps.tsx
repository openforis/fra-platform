import { ColumnNodeExt } from '../types'

export type CellProps = {
  value: string | Array<string>
  onChange: (newValue: string) => void
  disabled: boolean
  column: ColumnNodeExt
}

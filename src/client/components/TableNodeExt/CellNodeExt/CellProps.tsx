import { ColumnNodeExt } from 'client/components/TableNodeExt/types'

export type CellProps = {
  value: string | Array<string>
  onChange: (newValue: string) => void
  disabled: boolean
  column: ColumnNodeExt
}

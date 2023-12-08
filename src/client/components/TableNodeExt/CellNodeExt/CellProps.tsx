import { ColumnNodeExt } from '../types'

type MultiValueProps = {
  value: Array<string>
  onChange: (newValue: Array<string>) => void
}

type SingleValueProps = {
  value: string
  onChange: (newValue: string) => void
}

export type CellProps = {
  disabled: boolean
  column: ColumnNodeExt
}

export type CellMultiselectProps = CellProps & MultiValueProps

export type CellTextProps = CellProps & SingleValueProps

export type CellSelectProps = CellProps & SingleValueProps

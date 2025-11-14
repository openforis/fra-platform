export type ExportedTableData<T = unknown> = {
  schema: string
  table: string
  rows: Array<T>
  exportedAt: string
  rowCount: number
}

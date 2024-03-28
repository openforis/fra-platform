export type CSVData = {
  headers: Array<{
    key: string
    label: string
  }>
  data: Array<Record<string, string>>
}

export type CustomCsvDownload = {
  headers: {
    label: string
    key: string
  }[]
  data: Record<string, string>[]
}

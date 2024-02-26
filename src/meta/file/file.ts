export type FileSummary = {
  readonly createdAt: string
  readonly id: number
  readonly name: string
  readonly size: number
  readonly uuid: string
}

export type File = FileSummary & {
  readonly file: Buffer
}

export type FileUsage = {
  sectionLabel: string
  usageLabels: Array<string>
}

export type FileMeta = {
  summary: FileSummary
  usages: Array<FileUsage>
}

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

// export type FileUsages = {
//
// }

export type FileMeta = {
  summary: FileSummary
  // usages: FileUsages
}

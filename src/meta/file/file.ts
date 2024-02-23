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

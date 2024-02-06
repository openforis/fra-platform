export type File = {
  readonly id: number
  readonly uuid: string
  readonly fileName: string
  readonly file: Buffer
  readonly createdAt: string
}

import { Readable } from 'stream'

export type FileSummary = {
  readonly createdAt: string
  readonly id: number
  readonly name: string
  size: number
  readonly uuid: string
  readonly repositoryItemUuid: string
}

export type File = FileSummary & {
  file: Readable
}

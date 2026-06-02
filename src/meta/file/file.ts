import { Readable } from 'stream'

export type BaseFileSummary = {
  readonly name: string
  readonly repositoryItemUuid: string
  size: number
}

export type FileSummary = BaseFileSummary & {
  readonly createdAt: string
  readonly id: number
  readonly uuid: string
}

export type File = FileSummary & {
  file: Readable
}

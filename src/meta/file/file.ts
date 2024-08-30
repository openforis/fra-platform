import { Readable } from 'stream'

import { Label } from 'meta/assessment'

export type FileSummary = {
  readonly createdAt: string
  readonly id: number
  readonly name: string
  readonly size: number
  readonly uuid: string
  readonly repositoryItemUuid: string
}

export type File = FileSummary & {
  file: Readable
}

export type FileUsage = {
  sectionName: string
  suffix?: string
  locations: Array<Label>
}

export type FileMeta = {
  summary: FileSummary
  usages: Array<FileUsage>
}

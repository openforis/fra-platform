import { Label } from 'meta/assessment'

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
  sectionName: string
  locations: Array<Label>
}

export type FileMeta = {
  summary: FileSummary
  usages: Array<FileUsage>
}

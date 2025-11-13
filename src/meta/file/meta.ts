import { Label } from 'meta/assessment/label'
import { FileSummary } from 'meta/file/file'

export type FileUsage = {
  sectionName: string
  suffix?: string
  locations: Array<Label>
}

export type FileMeta = {
  summary: FileSummary
  usages: Array<FileUsage>
}

import { BaseFileSummary } from 'meta/file/file'

export type FileUploadOnChange = (filesSummaries: Array<BaseFileSummary>) => void

export type FileUploadProps = {
  id?: string
  multiple?: boolean
  onChange: FileUploadOnChange
  value?: Array<BaseFileSummary>
}

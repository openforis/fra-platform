import { FileSummary } from 'meta/file'

export type FileUploadOnChange = (filesSummaries: Array<FileSummary>) => void

export type FileUploadProps = {
  canDownload?: boolean
  id?: string
  multiple?: boolean
  onChange: FileUploadOnChange
  value?: Array<FileSummary>
}

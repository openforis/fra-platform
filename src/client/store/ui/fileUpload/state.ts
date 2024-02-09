import { File } from 'meta/file'

export type FileUploadState = {
  loading: boolean
  files?: Array<File>
  progress?: ProgressEvent
}

export const initialState: FileUploadState = {
  loading: false,
}

import { File } from 'meta/file'

export type FileUploadState = {
  loading: boolean
  files?: Array<File>
}

export const initialState: FileUploadState = {
  loading: false,
}

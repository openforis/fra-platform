export type FileUploadProgress = {
  loaded: number
  total: number
}

export type FileUploadState = {
  loading: boolean
  progress?: FileUploadProgress
}

export const initialState: FileUploadState = {
  loading: false,
}

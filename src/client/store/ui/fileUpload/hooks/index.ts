import { File } from 'meta/file'

import { useAppSelector } from 'client/store/store'
import { FileUploadSelectors } from 'client/store/ui/fileUpload/selectors'

export const useUploadedFiles = (): Array<File> => {
  return useAppSelector(FileUploadSelectors.getFiles)
}

export const useFileUploadProgress = (): ProgressEvent => {
  return useAppSelector(FileUploadSelectors.getProgress)
}

export const useIsFileUploadLoading = (): boolean => {
  return useAppSelector(FileUploadSelectors.isLoading)
}

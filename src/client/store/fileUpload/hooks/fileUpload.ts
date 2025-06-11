import { FileUploadSelectors } from 'client/store/fileUpload/selectors'
import { FileUploadProgress } from 'client/store/fileUpload/state'
import { useAppSelector } from 'client/store/hooks'

export const useFileUploadProgress = (): FileUploadProgress => {
  return useAppSelector(FileUploadSelectors.getProgress)
}

export const useIsFileUploadLoading = (): boolean => {
  return useAppSelector(FileUploadSelectors.isLoading)
}

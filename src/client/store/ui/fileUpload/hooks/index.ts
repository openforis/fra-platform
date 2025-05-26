import { useAppSelector } from 'client/store/hooks'
import { FileUploadSelectors } from 'client/store/ui/fileUpload/selectors'
import { FileUploadProgress } from 'client/store/ui/fileUpload/state'

export const useFileUploadProgress = (): FileUploadProgress => {
  return useAppSelector(FileUploadSelectors.getProgress)
}

export const useIsFileUploadLoading = (): boolean => {
  return useAppSelector(FileUploadSelectors.isLoading)
}

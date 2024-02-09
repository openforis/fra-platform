import { File } from 'meta/file'

import { useAppSelector } from 'client/store/store'
import { FileUploadSelectors } from 'client/store/ui/fileUpload/selectors'

export const useUploadedFiles = (): Array<File> => {
  return useAppSelector(FileUploadSelectors.getFiles)
}

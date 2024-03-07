import { uploadFiles } from 'client/store/ui/fileUpload/actions/uploadFiles'
import { FileUploadSlice } from 'client/store/ui/fileUpload/slice'

export const FileUploadActions = {
  ...FileUploadSlice.actions,
  uploadFiles,
}

import { FileUploadProps } from 'client/components/FileUpload/types'

export type Props = Pick<FileUploadProps, 'onChange' | 'value'> & {
  acceptedFiles: Array<File>
}

import './Files.scss'
import React from 'react'

import ButtonDelete from 'client/components/Buttons/ButtonDelete'
import FileDownload from 'client/components/FileUpload/Files/FileDownload'
import { FileUploadProps } from 'client/components/FileUpload/types'

type Props = Pick<FileUploadProps, 'onChange' | 'value'> & {
  acceptedFiles: ReadonlyArray<File>
}
const Files: React.FC<Props> = (props) => {
  const { acceptedFiles, onChange, value } = props
  return (
    <div className="file-upload__files">
      {value.map((fileSummary) => {
        return (
          <React.Fragment key={fileSummary.repositoryItemUuid}>
            <FileDownload acceptedFiles={acceptedFiles} fileSummary={fileSummary} />

            <ButtonDelete
              onClick={() => onChange(value.filter((f) => f.repositoryItemUuid !== fileSummary.repositoryItemUuid))}
            />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Files

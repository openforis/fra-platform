import './Files.scss'
import React from 'react'

import ButtonDelete from 'client/components/Buttons/ButtonDelete'
import FileDownload from 'client/components/FileUpload/Files/FileDownload'
import { FileUploadProps } from 'client/components/FileUpload/types'

type Props = Pick<FileUploadProps, 'canDownload' | 'onChange' | 'value'> & {
  acceptedFiles: Array<File>
}
const Files: React.FC<Props> = (props) => {
  const { canDownload, onChange, value, acceptedFiles } = props
  return (
    <div className="file-upload__files">
      {value.map((fileSummary) => {
        return (
          <React.Fragment key={fileSummary.uuid}>
            {canDownload && <FileDownload acceptedFiles={acceptedFiles} fileSummary={fileSummary} />}
            {!canDownload && <div>{fileSummary.name}</div>}

            <ButtonDelete onClick={() => onChange(value.filter((f) => f.uuid !== fileSummary.uuid))} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Files

import './Files.scss'
import React from 'react'

import ButtonDelete from 'client/components/Buttons/ButtonDelete'
import FileDownload from 'client/components/FileUpload/Files/FileDownload'
import { useOnDelete } from 'client/components/FileUpload/Files/hooks/useOnDelete'
import { Props } from 'client/components/FileUpload/Files/props'

const Files: React.FC<Props> = (props) => {
  const { value, acceptedFiles } = props
  const onDelete = useOnDelete(props)
  return (
    <div className="file-upload__files">
      {value.map((fileSummary) => {
        return (
          <React.Fragment key={fileSummary.uuid}>
            <FileDownload acceptedFiles={acceptedFiles} fileSummary={fileSummary} />

            <ButtonDelete onClick={() => onDelete(fileSummary)} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Files

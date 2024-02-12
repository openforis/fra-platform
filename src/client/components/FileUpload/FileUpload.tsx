import './FileUpload.scss'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { useFileUploadProgress } from 'client/store/ui/fileUpload'
import ProgressBar from 'client/components/ProgressBar'

type Props = {
  onDrop: (files: Array<File>) => void
  multiple?: boolean
  id?: string
}

const FileUpload: React.FC<Props> = (props: Props) => {
  const { onDrop, id, multiple } = props
  const { t } = useTranslation()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple })

  const progress = useFileUploadProgress()

  return (
    <>
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getRootProps()}
        className={classNames('file-drop', {
          'dropzone--isActive': isDragActive,
        })}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input id={id} {...getInputProps()} />
        {isDragActive ? <div>{t('fileDrop.dropFilesHere')}</div> : <div>{t('fileDrop.dragAndDropOrClick')}</div>}
      </div>
      <div className="progress-bar-container">
        {progress && <ProgressBar loaded={progress.loaded} total={progress.total} />}
      </div>
    </>
  )
}

FileUpload.defaultProps = {
  id: 'file-upload',
  multiple: false,
}

export default FileUpload

import './FileUpload.scss'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { useFileUploadProgress } from 'client/store/ui/fileUpload'
import Files from 'client/components/FileUpload/Files'
import { FileUploadProps } from 'client/components/FileUpload/types'
import ProgressBar from 'client/components/ProgressBar'

import { useUploadFiles } from './hooks/useUploadFiles'

const FileUpload: React.FC<FileUploadProps> = (props: FileUploadProps) => {
  const { canDownload, id, multiple, onChange, value } = props

  const { t } = useTranslation()
  const onDrop = useUploadFiles({ onChange })
  const progress = useFileUploadProgress()
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop, multiple })

  return (
    <div className="file-upload">
      {value && <Files acceptedFiles={acceptedFiles} canDownload={canDownload} onChange={onChange} value={value} />}

      {!progress && !value && (
        <div
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getRootProps()}
          className={classNames('file-upload__file-drop', { 'dropzone--isActive': isDragActive })}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <input id={id} {...getInputProps()} />
          <div>{t(isDragActive ? 'fileDrop.dropFilesHere' : 'fileDrop.dragAndDropOrClick')}</div>
        </div>
      )}

      {progress && <ProgressBar loaded={progress.loaded} total={progress.total} />}
    </div>
  )
}

export default FileUpload

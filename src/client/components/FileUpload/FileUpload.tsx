import './FileUpload.scss'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { File } from 'meta/file'

import { useFileUploadProgress, useUploadFiles } from 'client/store/ui/fileUpload'
import ProgressBar from 'client/components/ProgressBar'

import { useResetFilesOnUnmount } from './hooks/useResetFilesOnUnmount'

type Props = {
  multiple?: boolean
  id?: string
  onSuccess?: (files: Array<File>) => void
}

const FileUpload: React.FC<Props> = (props: Props) => {
  const { id, multiple, onSuccess } = props
  const { t } = useTranslation()

  const onDrop = useUploadFiles({ onSuccess })

  const progress = useFileUploadProgress()
  const disabled = Boolean(progress)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple, disabled })

  useResetFilesOnUnmount()

  return (
    <div className="file-upload">
      {!disabled && (
        <div
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getRootProps()}
          className={classNames('file-upload__file-drop', { 'dropzone--isActive': isDragActive })}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <input id={id} {...getInputProps()} />
          <div className="file-drop__text">
            {t(isDragActive ? 'fileDrop.dropFilesHere' : 'fileDrop.dragAndDropOrClick')}
          </div>
        </div>
      )}

      {progress && <ProgressBar loaded={progress.loaded} total={progress.total} />}
    </div>
  )
}

FileUpload.defaultProps = {
  id: 'file-upload',
  multiple: false,
  onSuccess: undefined,
}

export default FileUpload

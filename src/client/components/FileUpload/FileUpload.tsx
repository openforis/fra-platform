import './FileUpload.scss'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { File, Files } from 'meta/file'

import { useFileUploadProgress, useUploadedFiles, useUploadFiles } from 'client/store/ui/fileUpload'
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

  const files = useUploadedFiles()
  const onDrop = useUploadFiles({ onSuccess })

  const progress = useFileUploadProgress()
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple })

  useResetFilesOnUnmount()

  return (
    <div className="file-upload">
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getRootProps()}
        className={classNames('file-upload__file-drop', {
          'dropzone--isActive': isDragActive,
        })}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input id={id} {...getInputProps()} />
        <div className="file-drop__text">
          {t(isDragActive ? 'fileDrop.dropFilesHere' : 'fileDrop.dragAndDropOrClick')}
        </div>
      </div>

      {progress && <ProgressBar loaded={progress.loaded} total={progress.total} />}

      {files?.length > 0 && (
        <dl>
          {files.map((file, index) => (
            <React.Fragment key={String(index) + file.name}>
              <dt>{file.name}</dt>
              <dd>
                <span>{Files.humanReadableSize(file.size)}</span>
              </dd>
            </React.Fragment>
          ))}
        </dl>
      )}
    </div>
  )
}

FileUpload.defaultProps = {
  id: 'file-upload',
  multiple: false,
  onSuccess: undefined,
}

export default FileUpload

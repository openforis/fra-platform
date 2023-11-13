import './FileDrop.scss'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

type Props = {
  onDrop: (files: Array<File>) => void
}

const FileDrop: React.FC<Props> = (props: Props) => {
  const { onDrop } = props
  const { t } = useTranslation()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getRootProps()}
      className={classNames('file-drop', {
        'dropzone--isActive': isDragActive,
      })}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...getInputProps()} />
      {isDragActive ? <div>{t('ui.fileDrop.dropFilesHere')}</div> : <div>{t('ui.fileDrop.dragAndDropOrClick')}</div>}
    </div>
  )
}

export default FileDrop

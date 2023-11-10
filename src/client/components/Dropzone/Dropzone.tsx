import './Dropzone.scss'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

type Props = {
  onDrop: (files: Array<File>) => void
}

const Dropzone: React.FC<Props> = (props: Props) => {
  const { onDrop } = props
  const { t } = useTranslation()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getRootProps()}
      className={classNames('dropzone', {
        'dropzone--isActive': isDragActive,
      })}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>{t('Drop files here')}</p>
      ) : (
        <p>{t('Drag and drop some files here, or click to select files')}</p>
      )}
    </div>
  )
}

export default Dropzone

import React from 'react'
import { useTranslation } from 'react-i18next'

import { useUploadedFiles } from 'client/store/ui/fileUpload'
import FileUpload from 'client/components/FileUpload'

import { useOnDrop } from './hooks/useOnDrop'

// TODO: move
const humanFileSize = (size: number) => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  // @ts-ignore
  return `${(size / 1024 ** i).toFixed(2) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`
}

const FileInputField: React.FC = () => {
  const { t } = useTranslation()

  const files = useUploadedFiles()
  const file = files?.[0]

  const onDrop = useOnDrop()

  const label = `common.file`
  const id = `repository_form-input-file`

  return (
    <div className="repository-form__input-field">
      <label htmlFor={id} className="repository-form__label">
        {t(label)}
      </label>
      <FileUpload id={id} onDrop={onDrop} />
      {file && (
        <dl>
          <dt>{file.name}</dt>
          <dd>
            <span>{humanFileSize(file.size)}</span>
          </dd>
        </dl>
      )}
    </div>
  )
}

export default FileInputField

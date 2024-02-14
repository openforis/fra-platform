import React from 'react'
import { useTranslation } from 'react-i18next'

import { useRepositoryItem } from 'client/store/ui/repository'
import FileUpload from 'client/components/FileUpload'

import { useOnRemoveFile } from './hooks/useOnRemoveFile'

const FileInputField: React.FC = () => {
  const onRemoveFile = useOnRemoveFile()
  const repositoryItem = useRepositoryItem()
  const { t } = useTranslation()

  const id = `repository_form-input-file`
  const label = `common.file`

  return (
    <div className="repository-form__input-field">
      <label htmlFor={id} className="repository-form__label">
        {t(label)}
      </label>
      <FileUpload id={id} />
      {repositoryItem?.fileUuid && (
        <button type="button" onClick={onRemoveFile}>
          remove
        </button>
      )}
    </div>
  )
}

export default FileInputField

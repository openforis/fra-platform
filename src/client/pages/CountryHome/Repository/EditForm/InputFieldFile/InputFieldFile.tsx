import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { useRepositoryItem, useRepositoryItemPropValidation } from 'client/store/ui/repository'
import ButtonDelete from 'client/components/Buttons/ButtonDelete'
import FileUpload from 'client/components/FileUpload'

import { useOnRemoveFile } from './hooks/useOnRemoveFile'

const FileInputField: React.FC = () => {
  const onRemoveFile = useOnRemoveFile()
  const repositoryItem = useRepositoryItem()
  const { t } = useTranslation()

  const id = `repository_form-input-file`
  const label = `common.file`

  const error = useRepositoryItemPropValidation('fileUuid')

  return (
    <div className={classNames('repository-form__input-field', { error })}>
      <label htmlFor={id} className="repository-form__label">
        {t(label)}
      </label>
      <FileUpload id={id} />
      {repositoryItem?.fileUuid && <ButtonDelete onClick={onRemoveFile} />}
      <div className="repository-form__error-label">{error ? t(error) : ''}</div>
    </div>
  )
}

export default FileInputField

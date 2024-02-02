import React from 'react'
import { useTranslation } from 'react-i18next'

import { useSelectedFileContext } from 'client/context/selectedFilesContext'

const FileInputField: React.FC = () => {
  const { t } = useTranslation()

  const { setSelectedFiles } = useSelectedFileContext()

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files)
  }

  const label = `common.file`
  const id = `repository_form-input-file`

  return (
    <div className="repository-form__input-field">
      <label htmlFor={id} className="repository-form__label">
        {t(label)}
      </label>
      <input id={id} onChange={_onChange} className="repository-form__input" name="file" type="file" />
    </div>
  )
}

export default FileInputField

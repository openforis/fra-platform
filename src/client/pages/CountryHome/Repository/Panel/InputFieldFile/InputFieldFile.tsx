import React from 'react'
import { useTranslation } from 'react-i18next'

import FileUpload from 'client/components/FileUpload'

const FileInputField: React.FC = () => {
  const { t } = useTranslation()

  const label = `common.file`
  const id = `repository_form-input-file`

  return (
    <div className="repository-form__input-field">
      <label htmlFor={id} className="repository-form__label">
        {t(label)}
      </label>
      <FileUpload id={id} />
    </div>
  )
}

export default FileInputField

import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  label: string
  onChange: (value: FileList) => void
}

const FileInputField: React.FC<Props> = (props: Props) => {
  const { label, onChange } = props
  const { t } = useTranslation()

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files)
  }
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

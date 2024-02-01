import './InputField.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  label: string
  name: string
  onChange: (name: string, value: string) => void
  value: string
}

const InputField: React.FC<Props> = (props: Props) => {
  const { label, name, onChange, value = '' } = props
  const { t } = useTranslation()

  const _onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onChange(name, event.target.value),
    [name, onChange]
  )

  const id = `repository_edit-input-${name}`

  return (
    <div className="repository-form__input-field">
      <label htmlFor={id} className="repository-form__label">
        {t(label)}
      </label>
      <input id={id} value={value} onChange={_onChange} className="repository-form__input" name={name} type="text" />
    </div>
  )
}

export default InputField
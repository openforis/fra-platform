import './InputField.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  className?: string
  label: string
  name: string
  onChange: (name: string, value: File | string) => void
  type: string
  value?: string
}

const InputField: React.FC<Props> = (props: Props) => {
  const { label, name, type, className, onChange, value } = props
  const { t } = useTranslation()

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'file') {
      onChange(name, event.target.files[0])
      return
    }
    onChange(name, event.target.value)
  }

  return (
    <div className={`repository-form__input-field ${className}`}>
      <div className="repository-form__label">{t(label)}</div>
      <input value={value} onChange={_onChange} className="repository-form__input" name={name} type={type} />
    </div>
  )
}

InputField.defaultProps = {
  className: '',
  value: '',
}

export default InputField

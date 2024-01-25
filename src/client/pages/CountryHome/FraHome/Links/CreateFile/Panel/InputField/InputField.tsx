import './InputField.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  label: string
  name: string
  type: string
  className?: string
}

const InputField: React.FC<Props> = (props: Props) => {
  const { label, name, type, className } = props
  const { t } = useTranslation()

  return (
    <div className={`repository-form__input-field ${className}`}>
      <div className="repository-form__label">{t(label)}</div>
      <input className="repository-form__input" name={name} type={type} />
    </div>
  )
}

InputField.defaultProps = {
  className: '',
}

export default InputField
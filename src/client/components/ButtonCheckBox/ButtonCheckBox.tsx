import './ButtonCheckBox.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  label: Array<string> | string
  labelParam?: Record<string, string>
  className?: string
  checked: boolean
  suffix?: string
}

const ButtonCheckBox = (props: Props) => {
  const i18n = useTranslation()
  const { onClick, checked, className, labelParam, suffix } = props
  let { label } = props
  label = Array.isArray(label) ? label : [label]
  return (
    <button type="button" className={`btn-s btn-checkbox ${className}`} onClick={onClick}>
      <div className={`fra-checkbox${checked ? ' checked' : ''}`} />
      <div>{label.map((key: string) => `${labelParam ? i18n.t(key, labelParam) : i18n.t(key)} `)}</div>
      {suffix && <span className="suffix">{suffix}</span>}
    </button>
  )
}

ButtonCheckBox.defaultProps = {
  className: '',
  labelParam: null,
  suffix: null,
}

export default ButtonCheckBox

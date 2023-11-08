import './ButtonCheckBox.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  label: Array<string> | string | React.ReactNode
  labelParam?: Record<string, string>
  className?: string
  checked: boolean
  suffix?: string
}

const ButtonCheckBox: React.FC<Props> = (props) => {
  const i18n = useTranslation()
  const { onClick, checked, className, labelParam, suffix } = props
  let { label } = props
  if (typeof label === 'string') label = i18n.t(label)
  if (Array.isArray(label)) label = label.map((key) => `${labelParam ? i18n.t(key, labelParam) : i18n.t(key)} `)

  return (
    <button type="button" className={`btn-s btn-checkbox ${className}`} onClick={onClick}>
      <div className={classNames('fra-checkbox', { checked })} />
      <div>{label}</div>
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

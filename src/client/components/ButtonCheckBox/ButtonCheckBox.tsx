import './ButtonCheckBox.scss'
import React, { ReactNode } from 'react'

import classNames from 'classnames'

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  label: ReactNode
  className?: string
  checked: boolean
  suffix?: string
}

const ButtonCheckBox: React.FC<Props> = (props) => {
  const { onClick, checked, className, suffix } = props
  const { label } = props

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
  suffix: null,
}

export default ButtonCheckBox

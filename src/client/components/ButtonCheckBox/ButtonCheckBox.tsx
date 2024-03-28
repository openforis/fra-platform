import './ButtonCheckBox.scss'
import React, { ReactNode } from 'react'

import classNames from 'classnames'

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  label: ReactNode
  className?: string
  checked: boolean
  suffix?: string
  disabled?: boolean
}

/**
 * @deprecated
 * use 'client/components/Buttons/ButtonCheckbox'
 */
const ButtonCheckBox: React.FC<Props> = (props) => {
  const { checked, className, disabled, onClick, suffix } = props
  const { label } = props

  return (
    <button className={`btn-s btn-checkbox ${className}`} disabled={disabled} onClick={onClick} type="button">
      <div className={classNames('fra-checkbox', { checked })} />
      <div>{label}</div>
      {suffix && <span className="suffix">{suffix}</span>}
    </button>
  )
}

ButtonCheckBox.defaultProps = {
  className: '',
  suffix: null,
  disabled: false,
}

export default ButtonCheckBox

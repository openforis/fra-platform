import './ButtonCheckbox.scss'
import React from 'react'

import classNames from 'classnames'

import Button from 'client/components/Buttons/Button'
import { ButtonProps, ButtonType } from 'client/components/Buttons/Button/types'

type Props = Omit<ButtonProps, 'iconName' | 'inverse' | 'type'> & {
  checked?: boolean
  loading?: boolean
}

const ButtonCheckbox: React.FC<Props> = (props) => {
  const { checked, className, disabled, label, loading, onClick, size } = props

  return (
    <Button
      className={classNames('button-checkbox', className)}
      disabled={disabled}
      icon={
        loading ? (
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        ) : undefined
      }
      iconName={loading ? undefined : 'checkbox'}
      inverse={!checked}
      label={label}
      onClick={onClick}
      size={size}
      type={ButtonType.primary}
    />
  )
}

ButtonCheckbox.defaultProps = {
  checked: false,
  loading: false,
}
export default ButtonCheckbox

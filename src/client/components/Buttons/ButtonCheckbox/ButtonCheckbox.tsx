import './ButtonCheckbox.scss'
import React from 'react'
import classNames from 'classnames'

import { Objects } from 'utils/objects'

import Button from 'client/components/Buttons/Button'
import { ButtonProps, ButtonType } from 'client/components/Buttons/Button/types'
import { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox/types'

type Props = Pick<ButtonProps, 'className' | 'disabled' | 'label' | 'onClick' | 'size' | 'type'> & {
  checked?: boolean
  loading?: boolean
  variant?: ButtonCheckboxVariant
}

const ButtonCheckbox: React.FC<Props> = (props) => {
  const { checked, className, disabled, label, loading, onClick, size, type = ButtonType.primary, variant } = props

  return (
    <Button
      className={classNames('button-checkbox', className, { [variant]: !Objects.isEmpty(variant) })}
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
      type={type}
    />
  )
}

export default ButtonCheckbox

import { useMemo } from 'react'

import classNames from 'classnames'

import { ButtonProps, ButtonSize, ButtonType } from 'client/components/Buttons/Button/types'

export const useButtonClassName = (props: ButtonProps): string => {
  const { className, disabled, inverse, size = ButtonSize.s, type = ButtonType.primary } = props

  return useMemo<string>(() => {
    return classNames(
      'button',
      'no-print',
      `button__size-${size}`,
      `button__type-${type}`,
      { inverse },
      { disabled },
      className
    )
  }, [className, disabled, inverse, size, type])
}

import { useMemo } from 'react'
import classNames from 'classnames'

import { ButtonProps, ButtonSize, ButtonType } from 'client/components/Buttons/Button/types'

export const useButtonClassName = (props: ButtonProps): string => {
  const {
    bgTransparent,
    className,
    disabled,
    inverse,
    noBorder = false,
    noPrint = true,
    size = ButtonSize.s,
    type = ButtonType.primary,
  } = props

  return useMemo<string>(() => {
    return classNames(
      'button',
      { 'no-print': noPrint },
      `button__size-${size}`,
      `button__type-${type}`,
      { inverse },
      { disabled },
      { bgTransparent, noBorder },
      className
    )
  }, [bgTransparent, className, disabled, inverse, noBorder, noPrint, size, type])
}

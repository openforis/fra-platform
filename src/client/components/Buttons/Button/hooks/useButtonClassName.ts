import { useMemo } from 'react'

import classNames from 'classnames'

import { ButtonProps, ButtonSize, ButtonType } from 'client/components/Buttons/Button/types'

export const useButtonClassName = (props: ButtonProps): string => {
  const {
    className,
    disabled,
    iconName,
    inverse,
    label,
    noPrint = true,
    size = ButtonSize.s,
    type = ButtonType.primary,
  } = props

  return useMemo<string>(() => {
    return classNames(
      'button',
      { 'no-print': noPrint },
      { withIcon: Boolean(iconName) && Boolean(label) },
      `button__size-${size}`,
      `button__type-${type}`,
      { inverse },
      { disabled },
      className
    )
  }, [className, disabled, iconName, inverse, label, noPrint, size, type])
}

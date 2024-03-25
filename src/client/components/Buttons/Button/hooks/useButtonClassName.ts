import { useMemo } from 'react'

import classNames from 'classnames'

import { ButtonProps, ButtonSize, ButtonType } from 'client/components/Buttons/Button/types'

export const useButtonClassName = (props: ButtonProps): string => {
  const { className, disabled, icon, iconName, inverse, label, size = ButtonSize.s, type = ButtonType.primary } = props

  return useMemo<string>(() => {
    return classNames(
      'button',
      'no-print',
      { withIcon: (Boolean(iconName) || Boolean(icon)) && Boolean(label) },
      `button__size-${size}`,
      `button__type-${type}`,
      { inverse },
      { disabled },
      className
    )
  }, [className, disabled, icon, iconName, inverse, label, size, type])
}

import React from 'react'
import { useTranslation } from 'react-i18next'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { FormProps } from 'client/components/Form/types'

type CancelProps = Pick<FormProps, 'disabled' | 'hideCancel'> & {
  onClick: () => void
}

const Cancel: React.FC<CancelProps> = (props) => {
  const { disabled, hideCancel, onClick } = props

  const { t } = useTranslation()

  const label = t(disabled ? 'common.back' : 'common.cancel')

  if (hideCancel) return null

  return <Button label={label} onClick={onClick} size={ButtonSize.l} type={ButtonType.secondary} />
}

export default Cancel

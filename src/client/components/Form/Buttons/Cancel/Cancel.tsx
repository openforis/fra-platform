import React from 'react'
import { useTranslation } from 'react-i18next'

import { FormProps } from 'client/components/Form/types'

type CancelProps = Pick<FormProps, 'disabled' | 'hideCancel'> & {
  onClick: () => void
}

const Cancel: React.FC<CancelProps> = (props) => {
  const { disabled, hideCancel, onClick } = props

  const { t } = useTranslation()

  if (hideCancel) return null

  return (
    <button className="btn btn-secondary" onClick={onClick} type="button">
      {t(disabled ? 'common.back' : 'common.cancel')}
    </button>
  )
}

export default Cancel

import React from 'react'
import { useTranslation } from 'react-i18next'

interface CancelProps {
  onClick: () => void
}

const Cancel: React.FC<CancelProps> = (props) => {
  const { onClick } = props
  const { t } = useTranslation()

  return (
    <button className="btn btn-secondary" onClick={onClick} type="button">
      {t('common.cancel')}
    </button>
  )
}

export default Cancel

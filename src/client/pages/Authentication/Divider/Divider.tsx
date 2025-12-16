import './Divider.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Hr from 'client/components/Hr'

const Divider: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="divider">
      <Hr />
      {t('common.or')}
      <Hr />
    </div>
  )
}

export default Divider

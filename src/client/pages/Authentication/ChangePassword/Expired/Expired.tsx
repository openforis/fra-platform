import React from 'react'
import { useTranslation } from 'react-i18next'

const Expired: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="login-form">
      <h3>{t('login.expired')}</h3>
    </div>
  )
}

export default Expired

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Routes } from 'meta/routes'

const AccessLimited: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      {t('login.accessLimited')}
      <br />
      {t('login.returnHome')} <a href={Routes.Root.generatePath()}>{t('login.returnHomeClick')}</a>
    </div>
  )
}

export default AccessLimited

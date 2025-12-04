import './ChangePassword.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useData } from './hooks/useData'
import ChangePasswordForm from './ChangePasswordForm'
import ChangePasswordSkeleton from './ChangePasswordSkeleton'

const ChangePassword: React.FC = () => {
  const { t } = useTranslation()
  const data = useData()

  return (
    <div className="change-password">
      {data?.user?.email && <ChangePasswordForm data={data} />}
      {!data && <ChangePasswordSkeleton />}
      {data && !data.user?.email && <h3>{t('login.expired')}</h3>}
    </div>
  )
}

export default ChangePassword

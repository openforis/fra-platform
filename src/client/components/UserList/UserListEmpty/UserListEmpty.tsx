import React from 'react'
import { useTranslation } from 'react-i18next'

import InviteUserLink from 'client/components/UserList/InviteUserLink'

const UserListEmpty: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="landing__users-container">
      <div className="landing__activity-empty">
        <img src="/img/tucan.svg" height="72" alt="tucan" />
        <p className="landing__activity-empty-title">{t('userManagement.noUsers')}</p>

        <InviteUserLink className="btn-s btn-primary" />
      </div>
    </div>
  )
}

export default UserListEmpty

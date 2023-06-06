import './UsersCount.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Users } from 'meta/user'

import { useRoleNames, useUsersCount } from 'client/store/ui/userManagement'

const UsersCount: React.FC = () => {
  const { t } = useTranslation()
  const roleNames = useRoleNames()
  const usersCount = useUsersCount()

  return (
    <div className="user-counts__container">
      {roleNames.map((roleName) => (
        <div key={roleName} className="user-counts__item">
          {`${t(Users.getI18nRoleLabelKey(roleName))} ${usersCount[roleName] || 0}`}
        </div>
      ))}
    </div>
  )
}
export default UsersCount

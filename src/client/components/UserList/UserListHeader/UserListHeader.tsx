import React from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, Users } from 'meta/user'

import { useFilteredRoleNames } from 'client/store/ui/userManagement'
import { useIsAdminRoute } from 'client/hooks'
import InviteUserLink from 'client/components/UserList/InviteUserLink'

import UserListButtonExport from '../UserListButtonExport'

type Props = { readOnly: boolean }

const UserListHeader: React.FC<Props> = (props) => {
  const { readOnly } = props
  const isAdminRoute = useIsAdminRoute()

  const filteredRoleNames = useFilteredRoleNames()

  const { t } = useTranslation()

  return (
    <thead>
      <tr>
        <th className="user-list__header-cell">{t('common.name')}</th>
        {!isAdminRoute && (
          <>
            <th className="user-list__header-cell">{t('common.role')}</th>
            <th className="user-list__header-cell">{t('common.email')}</th>
          </>
        )}
        {isAdminRoute &&
          filteredRoleNames.map((roleName: RoleName) => (
            <th key={roleName} className="user-list__header-cell">
              {t(Users.getI18nRoleLabelKey(roleName))}
            </th>
          ))}
        {!readOnly && (
          <th className="user-list__header-cell user-list__edit-column">
            <UserListButtonExport isAdmin={isAdminRoute} />
            <InviteUserLink />
          </th>
        )}
      </tr>
    </thead>
  )
}

export default UserListHeader

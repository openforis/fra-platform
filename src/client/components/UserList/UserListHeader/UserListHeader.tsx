import React from 'react'
import { useTranslation } from 'react-i18next'

import InviteUserLink from 'client/components/UserList/InviteUserLink'

import UserListButtonExport from '../UserListButtonExport'

type Props = { readOnly: boolean }

const UserListHeader: React.FC<Props> = (props) => {
  const { readOnly } = props

  const { t } = useTranslation()

  return (
    <thead>
      <tr>
        <th className="user-list__header-cell">{t('common.name')}</th>
        <th className="user-list__header-cell">{t('common.role')}</th>
        <th className="user-list__header-cell">{t('common.email')}</th>
        {!readOnly && (
          <th className="user-list__header-cell user-list__edit-column">
            <div className="user-list__edit-column-buttons-container">
              <UserListButtonExport />
              <InviteUserLink />
            </div>
          </th>
        )}
      </tr>
    </thead>
  )
}

export default UserListHeader

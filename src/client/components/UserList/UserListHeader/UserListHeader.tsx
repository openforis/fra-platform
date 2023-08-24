import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { RoleName, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useFilteredRoleNames } from 'client/store/ui/userManagement'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

import UserListButtonExport from '../UserListButtonExport'

const UserListHeader: React.FC<{ isAdmin: boolean; readOnly: boolean }> = ({ isAdmin, readOnly }) => {
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const user = useUser()

  const filteredRoleNames = useFilteredRoleNames()

  const { t } = useTranslation()

  return (
    <thead>
      <tr>
        <th className="user-list__header-cell">{t('common.name')}</th>
        {!isAdmin && (
          <>
            <th className="user-list__header-cell">{t('common.role')}</th>
            <th className="user-list__header-cell">{t('common.email')}</th>
          </>
        )}
        {isAdmin &&
          filteredRoleNames.map((roleName: RoleName) => (
            <th key={roleName} className="user-list__header-cell">
              {t(Users.getI18nRoleLabelKey(roleName))}
            </th>
          ))}
        {!readOnly && (
          <th className="user-list__header-cell user-list__edit-column">
            <UserListButtonExport isAdmin={isAdmin} />
            {Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length > 0 && (
              <Link to="invite" className="btn-s btn-primary">
                <Icon className="icon-sub icon-white" name="small-add" /> {t('userManagement.addUser')}
              </Link>
            )}
          </th>
        )}
      </tr>
    </thead>
  )
}

export default UserListHeader

import React from 'react'

import { alternateNationalCorrespondent, collaborator, nationalCorrespondent, reviewer } from '@common/countryRole'

import { i18nUserRole } from '@common/userUtils'
import * as UserManagementState from '../../../app/user/userManagement/userManagementState'
import { useSelector } from 'react-redux'
import { useI18n } from '../../../hooks'

const roles = [nationalCorrespondent.role, alternateNationalCorrespondent.role, collaborator.role, reviewer.role]

const UsersCount = () => {
  const userCount: any = useSelector(UserManagementState.getUserCounts)
  const i18n = useI18n()

  return (
    <div className="user-counts__container">
      {userCount &&
        roles.map((role) => (
          <div key={role} className="user-counts__item">
            {`${userCount[role]} ${i18nUserRole(i18n, role, Number(userCount[role]))}`}
          </div>
        ))}
    </div>
  )
}

export default UsersCount

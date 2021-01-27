import React from 'react'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { alternateNationalCorrespondent, collaborator, nationalCorrespondent, reviewer } from '@common/countryRole'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { i18nUserRole } from '@common/userUtils'
import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'
import { useSelector } from 'react-redux'
import { useI18n } from '@webapp/components/hooks'

const roles = [nationalCorrespondent.role, alternateNationalCorrespondent.role, collaborator.role, reviewer.role]

const UsersCount = () => {
  const userCount = useSelector(UserManagementState.getUserCounts)
  const i18n = useI18n()

  return (
    <div className="user-counts__container">
      {userCount &&
        roles.map((role) => (
          <div key={role} className="user-counts__item">
            {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
            {`${userCount[role]} ${i18nUserRole(i18n, role, Number(userCount[role]))}`}
          </div>
        ))}
    </div>
  )
}

export default UsersCount

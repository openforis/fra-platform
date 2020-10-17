import React from 'react'

import {
  alternateNationalCorrespondent,
  collaborator,
  nationalCorrespondent,
  reviewer
} from '@common/countryRole'

import { i18nUserRole } from '@common/userUtils'

const roles = [
  nationalCorrespondent.role,
  alternateNationalCorrespondent.role,
  collaborator.role,
  reviewer.role
]

const UsersCount = ({ i18n, userCounts }) =>
  <div className="user-counts__container">
    {
      userCounts && roles.map(role =>
        <div key={role} className="user-counts__item">
          {`${userCounts[role]} ${i18nUserRole(i18n, role, Number(userCounts[role]))}`}
        </div>
      )
    }
  </div>

export default UsersCount

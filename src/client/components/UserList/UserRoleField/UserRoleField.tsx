import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { User, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'

const UserRoleField: React.FC<{ user: User; countryIso: CountryIso }> = ({ user, countryIso }) => {
  const { t } = useTranslation()
  const cycle = useCycle()

  return (
    <td className="user-list__cell">
      <div className="user-list__cell--read-only">
        {t(Users.getI18nRoleLabelKey(Users.getRole(user, countryIso, cycle)?.role))}
      </div>
    </td>
  )
}

export default UserRoleField

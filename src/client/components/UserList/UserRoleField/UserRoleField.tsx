import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from '@meta/area'
import { User, Users } from '@meta/user'

const UserRoleField: React.FC<{ user: User; countryIso: CountryIso }> = ({ user, countryIso }) => {
  const { t } = useTranslation()

  return (
    <td className="user-list__cell">
      <div className="user-list__cell--read-only">
        {t(Users.getI18nRoleLabelKey(Users.getCountryRole(user, countryIso).role))}
      </div>
    </td>
  )
}

export default UserRoleField

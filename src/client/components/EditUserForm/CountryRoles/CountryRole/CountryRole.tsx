import './CountryRole.scss'
import React, { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, User, UserRole, Users } from 'meta/user'

import { useUser } from 'client/store/user'

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>
  role: RoleName
  user: User
}

const CountryRole: React.FC<Props> = ({ onClick, role, user }) => {
  const { i18n } = useTranslation()
  const userInfo = useUser()

  return (
    <div className="edit-user__form-field-role-container validation-error-sensitive-field">
      <div className="edit-user__form-field-role">
        <div className="role">{i18n.t<string>(Users.getI18nRoleLabelKey(role))}</div>
        {Users.isAdministrator(userInfo) && (
          <button className="btn-xs btn-primary" onClick={onClick} type="button">
            {i18n.t<string>('description.edit')}
          </button>
        )}
      </div>

      <div className="edit-user__form-field-role edit-user__form-field-role-countries">
        {(user.roles || [])
          .filter((userRole: UserRole<RoleName>) => userRole.role === role)
          .map((userRole: UserRole<RoleName>) => (
            <div key={userRole.countryIso} className="edit-user__form-field-country-box">
              {i18n.t<string>(`area.${userRole.countryIso}.listName`)}
            </div>
          ))}
      </div>
    </div>
  )
}

export default CountryRole

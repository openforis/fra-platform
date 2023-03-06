import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { Areas } from '@meta/area'
import { RoleName, User, Users } from '@meta/user'

import { useAssessment, useCycle } from '@client/store/assessment'

const UserRolesField: React.FC<{ roleName: RoleName; user: User }> = ({ roleName, user }) => {
  const assessment = useAssessment()
  const cycle = useCycle()

  const { t } = useTranslation()

  return (
    <td className="user-list__cell">
      <div className="user-list__cell--roles">
        {user.roles
          .filter((role) => role.role === roleName)
          .map((role) => {
            if (role.role === RoleName.ADMINISTRATOR) return t(Users.getI18nRoleLabelKey(role.role))
            if (role.invitationUuid && !role.acceptedAt) return t(Areas.getTranslationKey(role.countryIso))
            return (
              <Link
                to={ClientRoutes.Assessment.Cycle.Country.Users.User.getLink({
                  countryIso: role.countryIso,
                  assessmentName: assessment.props.name,
                  cycleName: cycle.name,
                  id: user.id,
                })}
                type="button"
                className="link"
              >
                {t(Areas.getTranslationKey(role.countryIso))}
              </Link>
            )
          })}
      </div>
    </td>
  )
}

export default UserRolesField

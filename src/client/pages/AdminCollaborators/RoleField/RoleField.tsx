import './RoleField.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { TFunction } from 'i18next'

import { Areas, CountryIso } from 'meta/area'
import { TooltipId } from 'meta/tooltip'
import { CountryUserSummary, RoleName, Users } from 'meta/user'

type Props = {
  roleName: RoleName
  userSummary: CountryUserSummary
}

const _getAllRolesAndInvitations = (props: Props): Array<{ countryIso: CountryIso; invitation?: boolean }> => {
  const { userSummary, roleName } = props

  const invitations = userSummary.invitations
    ?.filter((role) => role.role === roleName)
    .map(({ countryIso }) => ({ countryIso, invitation: true }))

  const roles = userSummary.roles?.filter((role) => role.role === roleName).map(({ countryIso }) => ({ countryIso }))

  return [...(roles ?? []), ...(invitations ?? [])]
}

const _getRoleLabel = (countryIso: CountryIso, roleName: RoleName, invitation: boolean, t: TFunction): string => {
  const baseLabel =
    roleName === RoleName.ADMINISTRATOR
      ? t(Users.getI18nRoleLabelKey(RoleName.ADMINISTRATOR))
      : t(Areas.getTranslationKey(countryIso))

  return invitation ? `${baseLabel} (${t('admin.invitationPending')})` : baseLabel
}

const RoleField: React.FC<Props> = (props: Props) => {
  const { roleName, userSummary } = props
  const { t } = useTranslation()

  const allItems = _getAllRolesAndInvitations({ roleName, userSummary })

  const shouldCut = allItems.length > 3
  const firstThreeItems = shouldCut ? allItems.slice(0, 3) : allItems

  const tooltipContent = shouldCut
    ? allItems
        .map(({ countryIso, invitation }) => _getRoleLabel(countryIso, roleName, invitation ?? false, t))
        .join(', ')
    : ''

  return (
    <div
      className="admin-user-management__role-field"
      data-tooltip-content={tooltipContent}
      data-tooltip-id={TooltipId.info}
    >
      {firstThreeItems.map(({ countryIso, invitation }) => (
        <span key={`${userSummary.uuid}-${countryIso}`} className={classNames({ invitation })}>
          {_getRoleLabel(countryIso, roleName, false, t)}
        </span>
      ))}
    </div>
  )
}

export default RoleField

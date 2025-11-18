import './RoleField.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { TFunction } from 'i18next'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { TooltipId } from 'meta/tooltip/id'
import { CountryUserSummary, RoleName, Users } from 'meta/user'

const MAX_ITEMS = 3

type Props = {
  roleName: RoleName
  userSummary: CountryUserSummary
}

const _getAllRoles = (props: Props): Array<{ countryIso: CountryIso }> => {
  const { roleName, userSummary } = props
  return userSummary.roles?.filter((role) => role.role === roleName).map(({ countryIso }) => ({ countryIso })) ?? []
}

const _getRoleLabel = (countryIso: CountryIso, roleName: RoleName, t: TFunction): string => {
  return roleName === RoleName.ADMINISTRATOR
    ? t(Users.getI18nRoleLabelKey(RoleName.ADMINISTRATOR))
    : t(Areas.getTranslationKey(countryIso))
}

const RoleField: React.FC<Props> = (props: Props) => {
  const { roleName, userSummary } = props
  const { t } = useTranslation()

  const allItems = _getAllRoles({ roleName, userSummary })

  const shouldCut = allItems.length > MAX_ITEMS
  const firstThreeItems = shouldCut ? allItems.slice(0, MAX_ITEMS) : allItems

  const tooltipContent = allItems.map(({ countryIso }) => _getRoleLabel(countryIso, roleName, t)).join(', ')

  return (
    <div
      className="admin-user-management__role-field"
      data-tooltip-content={tooltipContent}
      data-tooltip-id={TooltipId.info}
    >
      {firstThreeItems.map(({ countryIso }) => (
        <span key={`${userSummary.uuid}-${countryIso}`}>{_getRoleLabel(countryIso, roleName, t)}</span>
      ))}
    </div>
  )
}

export default RoleField

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { RoleAdmin } from 'meta/user/roleAdmin'
import { UserRoles } from 'meta/user/userRoles'

type Props = {
  role: RoleAdmin
}

const Expired: React.FC<Props> = (props: Props) => {
  const { role } = props
  const { t } = useTranslation()

  const isExpired =
    !Objects.isEmpty(role.invitedAt) && Objects.isEmpty(role.acceptedAt) && UserRoles.isInvitationExpired(role)

  if (isExpired) {
    return <span>{t('common.yes')}</span>
  }

  return null
}

export default Expired

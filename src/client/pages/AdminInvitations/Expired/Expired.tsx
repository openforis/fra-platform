import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { UserInvitations, UserInvitationSummary } from 'meta/user'

type Props = {
  userInvitation: UserInvitationSummary
}

const Expired: React.FC<Props> = (props: Props) => {
  const { userInvitation } = props
  const { t } = useTranslation()

  const isExpired =
    !Objects.isEmpty(userInvitation.invitedAt) &&
    Objects.isEmpty(userInvitation.acceptedAt) &&
    UserInvitations.isExpired(userInvitation)

  if (isExpired) {
    return <span>{t('common.yes')}</span>
  }

  return null
}

export default Expired

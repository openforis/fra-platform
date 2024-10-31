import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { TooltipId } from 'meta/tooltip'
import { UserInvitations as UserInvitationMeta, UserInvitationSummary } from 'meta/user'

import Icon from 'client/components/Icon'

type Props = {
  userInvitation: UserInvitationSummary
}

const Info: React.FC<Props> = (props: Props) => {
  const { userInvitation } = props

  const { t } = useTranslation()

  const expired = UserInvitationMeta.isExpired(userInvitation)
  if (!expired) return null

  return (
    <div data-tooltip-content={t('login.invitationExpired')} data-tooltip-id={TooltipId.error}>
      <Icon className={classNames({ expired })} name="round-e-info" />
    </div>
  )
}

export default Info

import React from 'react'
import { useTranslation } from 'react-i18next'

import { InvitationData } from 'meta/user/invitations/invitation'

import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import { useHref } from 'client/pages/Authentication/Login/ButtonGoogle/hooks/useHref'

type Props = {
  disabled?: boolean
  invitationData?: InvitationData
}

const ButtonGoogle: React.FC<Props> = (props) => {
  const { disabled, invitationData } = props
  const { t } = useTranslation()

  const linkClassName = useButtonClassName({ size: ButtonSize.l, className: 'button-google', disabled })
  const href = useHref(invitationData)

  return (
    <a className={linkClassName} href={href}>
      {t('login.signInGoogle')}
    </a>
  )
}

export default ButtonGoogle

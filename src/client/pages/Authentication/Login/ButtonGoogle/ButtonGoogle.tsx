import React from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import { useHref } from 'client/pages/Authentication/Login/ButtonGoogle/hooks/useHref'

type Props = {
  assessmentName: string
  cycleName: string
  disabled: boolean
  invitationUuid?: string
}

const ButtonGoogle: React.FC<Props> = (props) => {
  const { assessmentName, cycleName, disabled, invitationUuid } = props
  const { t } = useTranslation()

  const linkClassName = useButtonClassName({ size: ButtonSize.l, className: 'button-google', disabled })
  const href = useHref({ assessmentName, cycleName, invitationUuid })

  return (
    <a className={linkClassName} href={href}>
      {t('login.signInGoogle')}
    </a>
  )
}

export default ButtonGoogle

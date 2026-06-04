import React from 'react'
import { useTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'

import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import { useHref } from 'client/pages/Authentication/Login/ButtonGoogle/hooks/useHref'

type Props = {
  assessmentName: string
  cycleName: string
  disabled: boolean
  invitationUuid?: string
  isLoading?: boolean
}

const ButtonGoogle: React.FC<Props> = (props) => {
  const { assessmentName, cycleName, disabled, invitationUuid, isLoading } = props
  const { t } = useTranslation()

  const linkClassName = useButtonClassName({ size: ButtonSize.l, className: 'button-google', disabled })
  const href = useHref({ assessmentName, cycleName, invitationUuid })

  if (isLoading) {
    return <Skeleton borderRadius="20px" height="48px" width="380px" />
  }

  return (
    <a className={linkClassName} href={href}>
      {t('login.signInGoogle')}
    </a>
  )
}

export default ButtonGoogle

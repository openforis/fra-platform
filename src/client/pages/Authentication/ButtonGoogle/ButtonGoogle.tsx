import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'

type Props = {
  invitationUuid?: string
}

const ButtonGoogle: React.FC = (props: Props) => {
  const { invitationUuid } = props
  const { t } = useTranslation()

  const linkClassName = useButtonClassName({ size: ButtonSize.l, className: 'button-google' })

  const assessmentName = 'fra'
  const cycleName = '2025'
  const countryIso = 'FIN'

  let href = `${ApiEndPoint.Auth.google()}?assessmentName=${assessmentName}&countryIso=${countryIso}&cycleName=${cycleName}`
  if (invitationUuid) href += `invitationUuid=${invitationUuid}    `

  return (
    <a className={linkClassName} href={href}>
      {t('login.signInGoogle')}
    </a>
  )
}

export default ButtonGoogle

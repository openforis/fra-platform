import React from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import { useHref } from 'client/pages/Authentication/ButtonGoogle/hooks/useHref'
import { DataInvitation } from 'client/pages/Authentication/Invitation/hooks/useData'

type Props = {
  data?: DataInvitation
  label?: string
}

const ButtonGoogle: React.FC<Props> = (props) => {
  const { data, label } = props
  const { t } = useTranslation()

  const linkClassName = useButtonClassName({ size: ButtonSize.l, className: 'button-google' })
  const href = useHref(data)

  return (
    <a className={linkClassName} href={href}>
      {t(label ?? 'login.signInGoogle')}
    </a>
  )
}

export default ButtonGoogle

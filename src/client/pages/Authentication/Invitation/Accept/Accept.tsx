import React from 'react'
import { useTranslation } from 'react-i18next'

import { Assessments } from 'meta/assessment/assessments'
import { Users } from 'meta/user/users'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { useOnAccept } from 'client/pages/Authentication/Invitation/Accept/hooks/useOnAccept'
import { DataInvitation, useData } from 'client/pages/Authentication/Invitation/hooks/useData'
import PrivacyNotice from 'client/pages/Authentication/Invitation/PrivacyNotice'

type Props = {
  data: DataInvitation
}

const Accept: React.FC<Props> = () => {
  const { t } = useTranslation()
  const data = useData()

  const { isLoading, onAccept } = useOnAccept({ data })

  if (!data) return null

  const { assessmentName, cycleName, userInvitation } = data

  const invitationMessageParams = {
    assessment: t(Assessments.getShortLabel(assessmentName)),
    country: t(`area.${userInvitation.countryIso}.listName`),
    cycle: cycleName,
    role: t(Users.getI18nRoleLabelKey(userInvitation.role)),
  }

  return (
    <div className="login-form">
      <h3>{t('login.invitationMessage', invitationMessageParams)}</h3>
      <Button disabled={isLoading} label={t('login.acceptInvitation')} onClick={onAccept} size={ButtonSize.l} />
      <PrivacyNotice />
    </div>
  )
}

export default Accept

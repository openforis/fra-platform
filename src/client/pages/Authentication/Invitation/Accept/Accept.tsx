import React from 'react'
import { useTranslation } from 'react-i18next'

import { Assessments } from 'meta/assessment/assessments'
import { InvitationData } from 'meta/user/invitations/invitation'
import { UserRoles } from 'meta/user/roles'
import { Users } from 'meta/user/users'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import FormAccept from 'client/pages/Authentication/Invitation/Accept/FormAccept'
import { useOnAccept } from 'client/pages/Authentication/Invitation/Accept/hooks/useOnAccept'

type Props = {
  data: InvitationData
}

const Accept: React.FC<Props> = (props) => {
  const { data } = props
  const { t } = useTranslation()

  const { isLoading, onAccept } = useOnAccept({ data })

  const { assessmentName, cycleName, userInvitation } = data

  const invitationMessageParams = {
    assessment: t(Assessments.getShortLabel(assessmentName)),
    country: t(`area.${userInvitation.countryIso}.listName`),
    cycle: cycleName,
    role: t(Users.getI18nRoleLabelKey(userInvitation.role)),
  }

  const showForm = UserRoles.isInvitationInfoRequired(userInvitation.role, assessmentName)

  return (
    <>
      <h3>{t('login.invitationMessage', invitationMessageParams)}</h3>
      {showForm && <div>{t('userManagement.personalInfoRequired')}</div>}
      {showForm ? (
        <FormAccept data={data} />
      ) : (
        <Button disabled={isLoading} label={t('login.acceptInvitation')} onClick={onAccept} size={ButtonSize.l} />
      )}
    </>
  )
}

export default Accept

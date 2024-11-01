import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { UserInvitationSummary } from 'meta/user'

import { useUser } from 'client/store/user'
import { useToaster } from 'client/hooks/useToaster'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

import { useRemoveInvitation } from './hooks/useRemoveInvitation'

interface Props {
  invitationSummary: UserInvitationSummary
}

const Remove: React.FC<Props> = (props: Props) => {
  const { invitationSummary } = props
  const { t } = useTranslation()
  const { toaster } = useToaster()
  const currentUser = useUser()

  const callback = useCallback(() => {
    toaster.success(t('userManagement.invitationDeleted'))
  }, [toaster, t])

  const removeInvitation = useRemoveInvitation({ invitationSummary, callback })
  const disabled = currentUser.uuid === invitationSummary.userUuid

  return (
    <Button
      disabled={disabled}
      iconName="trash-simple"
      inverse
      onClick={removeInvitation}
      size={ButtonSize.s}
      type={ButtonType.danger}
    />
  )
}

export default Remove

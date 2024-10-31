import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipId } from 'meta/tooltip'
import { UserInvitationSummary } from 'meta/user'

import { useUser } from 'client/store/user'
import { useToaster } from 'client/hooks/useToaster'
import Icon from 'client/components/Icon'

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

  return (
    <button
      className="btn-s btn-link-destructive"
      data-tooltip-content={t('userManagement.remove')}
      data-tooltip-id={TooltipId.error}
      disabled={currentUser.uuid === invitationSummary.userUuid}
      onClick={removeInvitation}
      type="button"
    >
      <Icon name="trash-simple" />
    </button>
  )
}

export default Remove

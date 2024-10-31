import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipId } from 'meta/tooltip'
import { UserInvitations, UserInvitationSummary } from 'meta/user'

import Icon from 'client/components/Icon'

import Popover from './Popover'

interface Props {
  invitationSummary: UserInvitationSummary
}

const Information: React.FC<Props> = (props: Props) => {
  const { invitationSummary } = props
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  if (UserInvitations.isExpired(invitationSummary)) {
    return null
  }

  return (
    <>
      <button
        className="btn-s btn-link"
        data-tooltip-content={t('userManagement.invitationLink')}
        data-tooltip-id={TooltipId.info}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <Icon name="round-e-info" />
      </button>

      <Popover invitationSummary={invitationSummary} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Information

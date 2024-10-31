import 'client/pages/CountryHome/Collaborators/UserList/UserInvitations/Buttons/Information/Popover/Popover.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Routes } from 'meta/routes'
import { UserInvitationSummary } from 'meta/user'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useToaster } from 'client/hooks/useToaster'
import Icon from 'client/components/Icon'

import { useResendInvitation } from '../../hooks/useResendInvitation'

type Props = {
  isOpen: boolean
  invitationSummary: UserInvitationSummary
  onClose: () => void
}

const Popover: React.FC<Props> = (props: Props) => {
  const { invitationSummary, onClose, isOpen } = props
  const { uuid: invitationUuid, lang } = invitationSummary
  const assessment = useAssessment()
  const cycle = useCycle()
  const { t } = useTranslation()
  const { toaster } = useToaster()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const { resendInvitation, isLoading } = useResendInvitation({
    invitationSummary,
    callback: onClose,
  })

  if (!isOpen) return null

  const url = `${window.location.origin}${Routes.LoginInvitation.generatePath(
    { assessmentName, cycleName },
    { invitationUuid, lang }
  )}`

  return (
    <div className="invitation-info-box">
      <div className="label">{t('userManagement.invitationLink')}</div>
      <ul>
        <li>
          <div className="input-buttons-wrapper">
            <input defaultValue={url} type="text" />
            <button
              className="btn-transparent"
              onClick={() => {
                navigator.clipboard.writeText(url).then(() => {
                  toaster.info(t('userManagement.invitationLinkCopied'))
                  onClose()
                })
              }}
              title={t('common.copyToClipboard')}
              type="button"
            >
              <Icon className="icon-no-margin icon-sub" name="content_copy" />
            </button>
          </div>
        </li>
        <li>
          <button className="btn-s btn-link" disabled={isLoading} onClick={resendInvitation} type="button">
            {t('userManagement.sendInvitation')}
          </button>
        </li>
      </ul>

      <div aria-hidden="true" className="invitation-info-box-close" onClick={onClose} role="button" tabIndex={0}>
        <Icon className="icon-no-margin icon-sub" name="remove" />
      </div>
    </div>
  )
}

export default Popover

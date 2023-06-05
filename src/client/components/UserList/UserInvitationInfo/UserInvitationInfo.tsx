import './UserInvitationInfo.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ClientRoutes } from 'meta/app'
import { User, Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryIso } from 'client/hooks'
import { useToaster } from 'client/hooks/useToaster'
import Icon from 'client/components/Icon'

const UserInvitationInfo: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const { t } = useTranslation()
  const { toaster } = useToaster()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const { invitationUuid } = Users.getRole(user, countryIso, cycle)

  const url = `${window.location.origin}${ClientRoutes.Assessment.Cycle.Login.Invitation.getLink({
    assessmentName,
    cycleName,
  })}?invitationUuid=${invitationUuid}`
  return (
    <div className="invitation-info-box">
      <div className="label">{t('userManagement.invitationLink')}</div>
      <ul>
        <li>
          <div className="input-buttons-wrapper">
            <input type="text" defaultValue={url} />
            <button
              className="btn-transparent"
              title={t('common.copyToClipboard')}
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(url).then(() => {
                  toaster.info(t('userManagement.invitationLinkCopied'))
                  onClose()
                })
              }}
            >
              <Icon name="content_copy" className="icon-no-margin icon-sub" />
            </button>
          </div>
        </li>
        <li>
          <button
            className="btn-s btn-link"
            type="button"
            onClick={() => {
              dispatch(
                UserManagementActions.sendInvitationEmail({
                  assessmentName,
                  countryIso,
                  cycleName,
                  invitationUuid,
                })
              ).then(() => {
                toaster.success(t('userManagement.invitationEmailSent'))
                onClose()
              })
            }}
          >
            {t('userManagement.sendInvitation')}
          </button>
        </li>
      </ul>

      <div className="invitation-info-box-close" onClick={onClose} role="button" tabIndex={0} aria-hidden="true">
        <Icon name="remove" className="icon-no-margin icon-sub" />
      </div>
    </div>
  )
}

export default UserInvitationInfo

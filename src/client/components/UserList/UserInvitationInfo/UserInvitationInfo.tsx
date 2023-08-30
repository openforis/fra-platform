import './UserInvitationInfo.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Routes } from 'meta/routes'
import { User, Users } from 'meta/user'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import { useToaster } from 'client/hooks/useToaster'
import Icon from 'client/components/Icon'
import { useResendInvitation } from 'client/components/UserList/hooks/useResendInvitation'

const UserInvitationInfo: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => {
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const { t } = useTranslation()
  const { toaster } = useToaster()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const { invitationUuid } = Users.getRole(user, countryIso, cycle)

  const callback = useCallback(() => {
    toaster.success(t('userManagement.invitationEmailSent'))
    onClose()
  }, [toaster, t, onClose])

  const resendInvitation = useResendInvitation({
    invitationUuid,
    callback,
  })

  const url = `${window.location.origin}${Routes.LoginInvitation.generatePath(
    { assessmentName, cycleName },
    { invitationUuid, lang: user.props.lang }
  )}`

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
          <button className="btn-s btn-link" type="button" onClick={resendInvitation}>
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

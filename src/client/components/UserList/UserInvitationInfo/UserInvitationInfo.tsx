import './UserInvitationInfo.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ClientRoutes } from '@meta/app'
import { User, Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useCountryIso } from '@client/hooks'
import { useToaster } from '@client/hooks/useToaster'
import Icon from '@client/components/Icon'

const UserInvitationInfo: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const { i18n } = useTranslation()
  const { toaster } = useToaster()

  const { invitationUuid } = Users.getRole(user, countryIso, cycle)

  return (
    <div className="user-list__invitation-info">
      <div>
        <div>
          {`${i18n.t('userManagement.invitationLink')}: ${
            window.location.origin
          }${ClientRoutes.Assessment.Cycle.Login.Invitation.getLink({
            assessmentName: assessment.props.name,
            cycleName: cycle.name,
          })}?invitationUuid=${invitationUuid}`}
        </div>
        <div>
          <button
            className="btn-s btn-link"
            onClick={async () => {
              dispatch(UserManagementActions.sendInvitationEmail({ countryIso, invitationUuid })).then(() => {
                toaster.success(i18n.t<string>('userManagement.invitationEmailSent'))
                onClose()
              })
            }}
            type="button"
          >
            {i18n.t<string>('userManagement.sendInvitation')}
          </button>
        </div>
      </div>
      <div onClick={onClose} role="button" tabIndex={0} aria-hidden="true">
        <Icon name="remove" />
      </div>
    </div>
  )
}

export default UserInvitationInfo

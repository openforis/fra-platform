import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@client/store'
import { LoginActions } from '@client/store/login'
import { Urls } from '@client/utils'
import { useUser } from '@client/store/user'
import { useTranslation } from 'react-i18next'

import { Objects } from '@core/utils'
import { BasePaths } from '@client/basePaths'
import { ApiEndPoint } from '@common/api/endpoint'

const Invitation: React.FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const loggedUser = useUser()
  const invitationUuid = Urls.getRequestParam('invitation')
  const { userRole, assessment, user: invitedUser } = useAppSelector((state) => state.login.invitation)
  const { i18n } = useTranslation()

  useEffect(() => {
    if (invitationUuid) {
      dispatch(LoginActions.fetchUserByInvitation(invitationUuid))
    }
  }, [])

  const onAccept = () => {
    dispatch(LoginActions.acceptInvitation(invitationUuid))
    history.push(BasePaths.Root())
  }

  if (Objects.isEmpty(invitationUuid) || !invitedUser) {
    return (
      <div className="login__form">
        <h3 style={{ textAlign: 'center' }}>{i18n.t('invitation.missingInvitationUuid')}</h3>
      </div>
    )
  }

  const cycle = assessment.cycles.find((cycle) => cycle.uuid === userRole.cycleUuid)

  return (
    <div className="login__form">
      <h3 style={{ textAlign: 'center' }}>
        {i18n.t('invitation.invitationMessage', {
          assessment: assessment.props.name,
          cycle: cycle.name,
          userRole: userRole.role,
        })}
      </h3>
      {loggedUser && loggedUser.email === invitedUser.email ? (
        <button type="button" className="btn" onClick={onAccept}>
          {i18n.t('invitation.acceptInvitation')}
        </button>
      ) : (
        <a className="btn" href={`${ApiEndPoint.Auth.Login.google()}${invitationUuid ? `?i=${invitationUuid}` : ''}`}>
          {i18n.t('invitation.acceptInvitationWithGoogle')}
        </a>
      )}
    </div>
  )
}

export default Invitation

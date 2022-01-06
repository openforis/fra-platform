import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@client/store'
import { LoginActions } from '@client/store/login'
import { Urls } from '@client/utils'
import { useUser } from '@client/store/user'
import { useTranslation } from 'react-i18next'

import { BasePaths } from '@client/basePaths'
import { ApiEndPoint } from '@common/api/endpoint'

const Invitation: React.FC = () => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const history = useHistory()
  const loggedUser = useUser()

  const invitationUuid = Urls.getRequestParam('invitationUuid')
  const { userRole, assessment, user: invitedUser } = useAppSelector((state) => state.login.invitation)

  useEffect(() => {
    if (invitationUuid) {
      dispatch(LoginActions.fetchUserByInvitation(invitationUuid))
    } else {
      history.push(BasePaths.Root())
    }
  }, [])

  const onAccept = () => {
    dispatch(LoginActions.acceptInvitation(invitationUuid))
    history.push(BasePaths.Root())
  }

  const cycle = assessment.cycles.find((cycle) => cycle.uuid === userRole.cycleUuid)

  return (
    <div className="login__form">
      <h3>
        {i18n.t('login.invitationMessage', {
          assessment: assessment.props.name,
          cycle: cycle.name,
          userRole: userRole.role,
        })}
      </h3>
      {loggedUser && loggedUser.email === invitedUser.email ? (
        <button type="button" className="btn" onClick={onAccept}>
          {i18n.t('login.acceptInvitation')}
        </button>
      ) : (
        <>
          <a
            className="btn"
            href={`${BasePaths.Login.root()}${invitationUuid ? `?invitationUuid=${invitationUuid}` : ''}`}
          >
            {i18n.t('login.acceptInvitation')}
          </a>

          <hr className="divider" />

          <a
            className="btn"
            href={`${ApiEndPoint.Auth.Login.google()}${invitationUuid ? `?invitationUuid=${invitationUuid}` : ''}`}
          >
            {i18n.t('login.acceptInvitationWithGoogle')}
          </a>
        </>
      )}
    </div>
  )
}

export default Invitation

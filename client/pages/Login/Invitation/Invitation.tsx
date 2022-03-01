import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@client/store'
import { LoginActions, useInvitation } from '@client/store/login'
import { Urls } from '@client/utils'
import { useUser } from '@client/store/user'

import { BasePaths } from '@client/basePaths'
import { ApiEndPoint } from '@common/api/endpoint'
import LoginForm from '@client/pages/Login/LoginForm'

const Invitation: React.FC = () => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const history = useHistory()
  const loggedUser = useUser()

  const invitationUuid = Urls.getRequestParam('invitationUuid')
  const { userRole, assessment, invitedUser } = useInvitation()

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

  const cycle = assessment?.cycles.find((cycle) => cycle.uuid === userRole.cycleUuid)

  if (userRole?.acceptedAt) {
    return (
      <div className="login__form">
        <h3>{i18n.t('login.alreadyAcceptedInvitation')}</h3>
      </div>
    )
  }

  return (
    invitedUser && (
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
            <LoginForm invitationUuid={invitationUuid} />

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
  )
}

export default Invitation

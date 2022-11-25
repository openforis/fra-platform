import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ApiEndPoint } from '@meta/api/endpoint'
import { Users } from '@meta/user'
import { UserRoles } from '@meta/user/userRoles'

import { useAppDispatch } from '@client/store'
import { LoginActions, useInvitation } from '@client/store/login'
import { useUser } from '@client/store/user'
import LoginForm from '@client/pages/Login/LoginForm'
import { Urls } from '@client/utils'

const Invitation: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const loggedUser = useUser()

  const invitationUuid = Urls.getRequestParam('invitationUuid')
  const { userRole, assessment, invitedUser } = useInvitation()

  useEffect(() => {
    if (invitationUuid) {
      dispatch(LoginActions.fetchUserByInvitation({ invitationUuid }))
    } else {
      navigate('/')
    }
  }, [dispatch, invitationUuid, navigate])

  const onAccept = () => {
    dispatch(LoginActions.acceptInvitation({ invitationUuid }))
    navigate('/')
  }

  const cycle = assessment?.cycles.find((cycle) => cycle.uuid === userRole.cycleUuid)

  if (userRole?.acceptedAt) {
    return (
      <div className="login__form">
        <h3>{t('login.alreadyAcceptedInvitation')}</h3>
      </div>
    )
  }

  if (userRole && UserRoles.isInvitationExpired(userRole)) {
    return (
      <div className="login__form">
        <h3>{t('login.invitationExpired')}</h3>
      </div>
    )
  }

  if (!invitedUser) return null

  return (
    <div className="login__form">
      <h3>
        {t('login.invitationMessage', {
          assessment: assessment.props.name,
          cycle: cycle.name,
          userRole: t(Users.getI18nRoleLabelKey(userRole.role)),
        })}
      </h3>

      {loggedUser?.email === invitedUser.email ? (
        <button type="button" className="btn" onClick={onAccept}>
          {t('login.acceptInvitation')}
        </button>
      ) : (
        <>
          <LoginForm invitationUuid={invitationUuid} />

          <hr className="divider" />

          <a
            className="btn"
            href={`${ApiEndPoint.Auth.google()}${invitationUuid ? `?invitationUuid=${invitationUuid}` : ''}`}
          >
            {t('login.acceptInvitationWithGoogle')}
          </a>
        </>
      )}
    </div>
  )
}

export default Invitation

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { ApiEndPoint } from '@meta/api/endpoint'
import { ClientRoutes } from '@meta/app'
import { Users } from '@meta/user'
import { UserRoles } from '@meta/user/userRoles'

import { useAppDispatch } from '@client/store'
import { LoginActions, useInvitation } from '@client/store/login'
import { useUser } from '@client/store/user'
import { isError, LoginValidator } from '@client/pages/Login/utils/LoginValidator'
import { Urls } from '@client/utils'

const Invitation: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const loggedUser = useUser()

  const invitationUuid = Urls.getRequestParam('invitationUuid')
  const { userRole, assessment, invitedUser, userProviders } = useInvitation()

  const [isLocal, setIsLocal] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (invitationUuid) {
      dispatch(LoginActions.fetchUserByInvitation({ invitationUuid }))
    } else {
      navigate('/')
    }
  }, [dispatch, invitationUuid, navigate])

  useEffect(() => {
    if (invitedUser?.email) setEmail(invitedUser.email)
  }, [invitedUser?.email])

  const onAccept = () => {
    dispatch(LoginActions.acceptInvitation({ invitationUuid }))
    navigate('/')
  }

  const onInvitation = () => {
    const fieldErrors = LoginValidator.invitationValidate(email, password, password2)
    setErrors(fieldErrors)

    if (!isError(fieldErrors)) {
      dispatch(
        LoginActions.localLogin({
          email,
          password,
          invitationUuid,
          navigate,
        })
      )
    }
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

  if (isLocal) {
    return (
      <div className="login__form">
        <Link to={ClientRoutes.Login.ResetPassword.getLink()} type="button" className="btn-forgot-pwd">
          {t('login.forgotPassword')}
        </Link>
      </div>
    )
  }

  return (
    <div className="login__formWrapper">
      <h3>
        {t('login.invitationMessage', {
          assessment: assessment.props.name,
          cycle: cycle.name,
          userRole: t(Users.getI18nRoleLabelKey(userRole.role)),
        })}
      </h3>

      {userProviders?.length > 0 && (
        <h3>{t('login.invitationProvidersRegistered', { authProviderNames: userProviders.join(', ') })}</h3>
      )}

      {loggedUser?.email === invitedUser.email ? (
        <button type="button" className="btn" onClick={onAccept}>
          {t('login.acceptInvitation')}
        </button>
      ) : (
        <div className="login__form">
          <button className="btn" type="button" onClick={() => setIsLocal(true)}>
            {t('login.acceptInvitationWithFra')}
          </button>

          <a
            className="btn"
            href={`${ApiEndPoint.Auth.google()}${invitationUuid ? `?invitationUuid=${invitationUuid}` : ''}`}
          >
            {t('login.acceptInvitationWithGoogle')}
          </a>

          <div>
            {t('login.accessLimited')}
            <br />
            {t('login.returnHome')} <a href="/">{t('login.returnHomeClick')}</a>
          </div>

          <hr />
        </div>
      )}
    </div>
  )
}

export default Invitation

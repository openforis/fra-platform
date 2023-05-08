import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { ApiEndPoint } from '@meta/api/endpoint'
import { ClientRoutes } from '@meta/app'
import { AuthProvider, Users } from '@meta/user'
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

  const showPassword2 =
    (invitedUser && !userProviders) || (userProviders && !userProviders.includes(AuthProvider.local))

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
    const fieldErrors = showPassword2
      ? LoginValidator.invitationValidate(email, password, password2)
      : LoginValidator.localValidate(email, password)
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

  const showForgotPassword = !userProviders || userProviders.includes(AuthProvider.local)

  return (
    <div className="login__formWrapper">
      <h3>
        {t('login.invitationMessage', {
          assessment: t(`fra.labels.${assessment.props.name}`),
          cycle: cycle.name,
          role: t(Users.getI18nRoleLabelKey(userRole.role)),
          country: t(`area.${userRole.countryIso}.listName`),
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
          {isLocal ? (
            <>
              <input
                onFocus={() => setErrors({ ...errors, email: null })}
                name="email"
                value={email}
                disabled={!!invitedUser}
                type="text"
                placeholder={t('login.email')}
                onChange={(event) => setEmail(event.target.value)}
              />
              {errors.email && <span className="login__field-error">{t(errors.email)}</span>}

              <input
                onFocus={() => setErrors({ ...errors, password: null })}
                value={password}
                type="password"
                placeholder={t('login.password')}
                onChange={(event) => setPassword(event.target.value)}
              />
              {errors.password && <span className="login__field-error">{t(errors.password)}</span>}

              {showPassword2 && (
                <>
                  <input
                    onFocus={() => setErrors({ ...errors, password2: null })}
                    value={password2}
                    type="password"
                    placeholder={t('login.repeatPassword')}
                    onChange={(event) => setPassword2(event.target.value)}
                  />
                  {errors.password2 && <span className="login__field-error">{t(errors.password2)}</span>}
                </>
              )}

              {showForgotPassword && (
                <Link
                  to={ClientRoutes.Assessment.Cycle.Login.ResetPassword.getLink({
                    assessmentName: assessment.props.name,
                    cycleName: cycle.name,
                  })}
                  type="button"
                  className="btn-forgot-pwd"
                >
                  {t('login.forgotPassword')}
                </Link>
              )}

              <button type="button" className="btn" onClick={onInvitation}>
                {t('login.acceptInvitationWithFra')}
              </button>
            </>
          ) : (
            <button className="btn" type="button" onClick={() => setIsLocal(true)}>
              {t('login.acceptInvitationWithFra')}
            </button>
          )}

          <div className="divider" />

          <a
            className="btn"
            href={`${ApiEndPoint.Auth.google()}?assessmentName=${assessment.props.name}&cycleName=${
              cycle.name
            }&invitationUuid=${invitationUuid}`}
          >
            {t('login.acceptInvitationWithGoogle')}
          </a>
        </div>
      )}

      <div>
        {t('login.accessLimited')}
        <br />
        {t('login.returnHome')} <a href="/">{t('login.returnHomeClick')}</a>
      </div>
    </div>
  )
}

export default Invitation

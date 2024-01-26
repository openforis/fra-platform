import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Assessments } from 'meta/assessment'
import { LoginInvitationQueryParams, Routes } from 'meta/routes'
import { AuthProvider, Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAppDispatch } from 'client/store'
import { LoginActions, useInvitation } from 'client/store/login'
import { useUser } from 'client/store/user'
import { useSearchParams } from 'client/hooks/useSearchParams'
import Icon from 'client/components/Icon'
import { isError, LoginValidator } from 'client/pages/Login/utils/LoginValidator'
import { videoResources } from 'client/pages/Tutorials'

import { useInitInvitation } from './hooks/useInitInvitation'

const Invitation: React.FC = () => {
  const dispatch = useAppDispatch()
  const { i18n, t } = useTranslation()
  const navigate = useNavigate()
  const loggedUser = useUser()

  useInitInvitation()

  const { invitationUuid } = useSearchParams<LoginInvitationQueryParams>()
  const { userRole, assessment, invitedUser, userProviders } = useInvitation()

  const [isLocal, setIsLocal] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const cycle = assessment?.cycles.find((cycle) => cycle.uuid === userRole.cycleUuid)
  const assessmentName = assessment?.props.name
  const cycleName = cycle?.name
  const showPassword2 =
    (invitedUser && !userProviders) || (userProviders && !userProviders.includes(AuthProvider.local))

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
        })
      ).then(() => {
        navigate(Routes.Root.path.absolute)
      })
    }
  }

  if (userRole?.acceptedAt) {
    if (loggedUser) {
      return <Navigate to={Routes.Root.generatePath()} />
    }
    return <Navigate to={Routes.Login.generatePath({ cycleName, assessmentName })} />
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
          assessment: t(Assessments.getShortLabel(assessmentName)),
          cycle: cycleName,
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
                  to={Routes.LoginResetPassword.generatePath({
                    assessmentName,
                    cycleName,
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
            <>
              <button className="btn" type="button" onClick={() => setIsLocal(true)}>
                {t('login.acceptInvitationWithFra')}
              </button>

              <a
                className="btn-help"
                href={videoResources[0].url[i18n.resolvedLanguage] ?? videoResources[0].url.en}
                rel="noreferrer"
                target="_blank"
              >
                <Icon name="video" className="icon-sub" /> {t(videoResources[0].labelKeyShort)}
              </a>
            </>
          )}

          <div className="divider" />

          <a
            className="btn"
            href={`${ApiEndPoint.Auth.google()}?assessmentName=${assessmentName}&cycleName=${cycleName}&invitationUuid=${invitationUuid}`}
          >
            {t('login.acceptInvitationWithGoogle')}
          </a>

          <a
            className="btn-help"
            href={videoResources[1].url[i18n.resolvedLanguage] ?? videoResources[1].url.en}
            rel="noreferrer"
            target="_blank"
          >
            <Icon name="video" className="icon-sub" /> {t(videoResources[1].labelKeyShort)}
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

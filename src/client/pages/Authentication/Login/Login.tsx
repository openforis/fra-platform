import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'
import { LoginQueryParams } from 'meta/routes/queryParams/login'
import { Routes } from 'meta/routes/routes'
import { AuthProvider } from 'meta/user/auth'
import { Objects } from 'utils/objects'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import { useSearchParams } from 'client/hooks/searchParams'
import Icon from 'client/components/Icon'
import Divider from 'client/pages/Authentication/Divider'
import FormLogin from 'client/pages/Authentication/FormLogin'
import { useOnSuccess } from 'client/pages/Authentication/FormLogin/hooks/useOnSuccess'
import ButtonGoogle from 'client/pages/Authentication/Login/ButtonGoogle'
import { videoResources } from 'client/pages/Tutorials'

import { useGetInvitation } from './hooks/useGetInvitation'
import { useRedirect } from './hooks/useRedirect'

const Login: React.FC = () => {
  const { i18n, t } = useTranslation()

  const { assessmentName: routeAssessmentName, cycleName: routeCycleName } = useCycleRouteParams()
  const { error, invitationData, loaded, loading } = useGetInvitation()
  const { invitationUuid } = useSearchParams<LoginQueryParams>()

  const assessmentName = invitationData?.assessmentName ?? routeAssessmentName
  const cycleName = invitationData?.cycleName ?? routeCycleName

  const isRegister = Boolean(invitationData && !invitationData.userProviders.includes(AuthProvider.local))

  const hasInvitationUuid = !Objects.isEmpty(invitationUuid)
  const isLoading = loading || (hasInvitationUuid && !loaded && !error)
  const { redirectUrl } = useRedirect({ error, invitationData, loaded })
  const onSuccess = useOnSuccess({ redirectTo: redirectUrl })

  return (
    <div className="login-form">
      <FormLogin
        action={ApiEndPoint.Auth.login()}
        disableEmail={Boolean(invitationData)}
        email={invitationData?.user.email}
        invitationUuid={isRegister ? invitationUuid : undefined}
        labels={{ submit: t('login.signInFRA') }}
        loading={isLoading}
        onSuccess={onSuccess}
        password2={isRegister}
      />

      {!isRegister && (
        <Link
          className="btn-help"
          to={Routes.LoginResetPassword.generatePath({ assessmentName, cycleName })}
          type="button"
        >
          {t('login.forgotPassword')}
        </Link>
      )}
      {isRegister && (
        <a
          className="btn-help"
          href={videoResources[0].url[i18n.resolvedLanguage] ?? videoResources[0].url.en}
          rel="noreferrer"
          target="_blank"
        >
          <Icon name="video" /> {t(videoResources[0].labelKeyShort)}
        </a>
      )}
      <Divider />
      <ButtonGoogle
        assessmentName={assessmentName}
        cycleName={cycleName}
        disabled={Boolean(invitationUuid && !invitationData)}
        invitationUuid={invitationUuid}
        isLoading={isLoading}
      />
      {isRegister && (
        <a
          className="btn-help"
          href={videoResources[1].url[i18n.resolvedLanguage] ?? videoResources[1].url.en}
          rel="noreferrer"
          target="_blank"
        >
          <Icon name="video" /> {t(videoResources[1].labelKeyShort)}
        </a>
      )}
    </div>
  )
}

export default Login

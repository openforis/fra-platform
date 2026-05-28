import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'
import { LoginQueryParams } from 'meta/routes/queryParams/login'
import { Routes } from 'meta/routes/routes'
import { AuthProvider } from 'meta/user/auth'
import { InvitationData } from 'meta/user/invitations/invitation'
import { Objects } from 'utils/objects'

import { useGetRequest } from 'client/hooks/getRequest'
import { useCycleRouteParams } from 'client/hooks/routeParams'
import { useSearchParams } from 'client/hooks/searchParams'
import Icon from 'client/components/Icon'
import Divider from 'client/pages/Authentication/Divider'
import FormLogin from 'client/pages/Authentication/FormLogin'
import { useOnSuccess } from 'client/pages/Authentication/FormLogin/hooks/useOnSuccess'
import ButtonGoogle from 'client/pages/Authentication/Login/ButtonGoogle'
import { useRedirect } from 'client/pages/Authentication/Login/hooks/useRedirect'
import { videoResources } from 'client/pages/Tutorials'

export const useGetInvitation = (): InvitationData => {
  const { invitationUuid } = useSearchParams<LoginQueryParams>()
  const { data: invitationData, dispatch: fetchData } = useGetRequest(ApiEndPoint.User.invitation(), {
    params: { invitationUuid },
  })

  useEffect(() => {
    if (!Objects.isEmpty(invitationUuid)) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitationUuid])

  return invitationData
}

const Login: React.FC = () => {
  const { i18n, t } = useTranslation()

  const { assessmentName, cycleName } = useCycleRouteParams()
  const invitationData = useGetInvitation()
  const { invitationUuid } = useSearchParams<LoginQueryParams>()

  // Show register form if user has no local login
  const isRegister = Boolean(invitationData && !invitationData.userProviders.includes(AuthProvider.local))

  const { redirectUrl } = useRedirect({ invitationData })
  const onSuccess = useOnSuccess({ redirectTo: redirectUrl })

  return (
    <div className="login-form">
      {invitationUuid && !invitationData && <div>Add a FormLoginSkeleton</div>}

      {(!invitationUuid || invitationData) && (
        <FormLogin
          action={ApiEndPoint.Auth.login()}
          disableEmail={Boolean(invitationData)}
          email={invitationData?.user.email}
          invitationUuid={isRegister ? invitationUuid : undefined}
          labels={{ submit: t('login.signInFRA') }}
          onSuccess={onSuccess}
          password2={isRegister}
        />
      )}
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
      <ButtonGoogle disabled={invitationUuid && !invitationData} invitationData={invitationData} />
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

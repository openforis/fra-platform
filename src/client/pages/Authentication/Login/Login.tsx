import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'
import { LoginQueryParams } from 'meta/routes/queryParams/login'
import { Routes } from 'meta/routes/routes'
import { InvitationData } from 'meta/user/invitations/invitation'
import { Objects } from 'utils/objects'

import { useUser } from 'client/store/user/hooks/user'
import { useGetRequest } from 'client/hooks/getRequest'
import { useCycleRouteParams } from 'client/hooks/routeParams'
import { useSearchParams } from 'client/hooks/searchParams'
import ButtonGoogle from 'client/pages/Authentication/ButtonGoogle'
import Divider from 'client/pages/Authentication/Divider'
import FormLogin from 'client/pages/Authentication/FormLogin'
import { useOnSuccess } from 'client/pages/Authentication/FormLogin/hooks/useOnSuccess'
import { useGetRedirectUrl } from 'client/pages/Authentication/Login/hooks/useGetRedirectUrl'

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
  const { t } = useTranslation()

  const user = useUser()

  const { assessmentName, cycleName } = useCycleRouteParams()
  const invitationData = useGetInvitation()
  const { invitationUuid } = useSearchParams<LoginQueryParams>()

  const isNewUser = Boolean(invitationData && Objects.isEmpty(invitationData.userProviders))
  const redirectUrl = useGetRedirectUrl(invitationData)
  const onSuccess = useOnSuccess({ redirectTo: redirectUrl })

  if (invitationData && user?.uuid === invitationData.user.uuid) {
    return <Navigate replace to={redirectUrl} />
  }

  if (invitationData && user?.uuid !== invitationData.user.uuid) {
    // TODO: Redirect / and show notification
  }

  return (
    <div className="login-form">
      {invitationUuid && !invitationData && <div>Add a FormLoginSkeleton</div>}

      {(!invitationUuid || invitationData) && (
        <FormLogin
          action={ApiEndPoint.Auth.login()}
          disableEmail={Boolean(invitationData)}
          email={invitationData?.user.email}
          invitationUuid={isNewUser ? invitationUuid : undefined}
          labels={{ submit: t('login.signInFRA') }}
          onSuccess={onSuccess}
          password2={isNewUser}
        />
      )}
      <Link
        className="btn-help"
        to={Routes.LoginResetPassword.generatePath({ assessmentName, cycleName })}
        type="button"
      >
        {t('login.forgotPassword')}
      </Link>
      <Divider />
      <ButtonGoogle disabled={invitationUuid && !invitationData} />
    </div>
  )
}

export default Login

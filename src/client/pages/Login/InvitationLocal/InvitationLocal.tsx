import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Assessments } from 'meta/assessment/assessments'
import { LoginInvitationQueryParams } from 'meta/routes/queryParams/invitation'
import { Routes } from 'meta/routes/routes'
import { AuthProvider } from 'meta/user/auth'
import { UserInvitations } from 'meta/user/invitations'

import { useInvitation } from 'client/store/login/hooks/invitation'
import { useUser } from 'client/store/user/hooks/user'
import { useSearchParams } from 'client/hooks/searchParams'
import Form from 'client/components/Form'
import Link from 'client/components/Links/Link'
import { useInitInvitation } from 'client/pages/Login/Invitation/hooks/useInitInvitation'
import { useFormDefinition } from 'client/pages/Login/InvitationLocal/hooks/useFormDefinition'
import { useOnCancel } from 'client/pages/Login/InvitationLocal/hooks/useOnCancel'
import { useOnSuccess } from 'client/pages/Login/InvitationLocal/hooks/useOnSuccess'
import { useValidationSchema } from 'client/pages/Login/InvitationLocal/hooks/useValidationSchema'

const InvitationLocal: React.FC = () => {
  const { t } = useTranslation()
  const loggedUser = useUser()
  useInitInvitation()
  const { invitationUuid, lang } = useSearchParams<LoginInvitationQueryParams>()
  const { assessment, invitedUser, userInvitation, userProviders } = useInvitation()

  const cycle = Assessments.getCycle({ assessment, cycleUuid: userInvitation?.cycleUuid })
  const assessmentName = assessment?.props.name
  const cycleName = cycle?.name

  const showForgotPassword = userProviders?.includes(AuthProvider.local)

  const formDefinition = useFormDefinition({ userProviders, invitedUser })
  const validationSchema = useValidationSchema({ userProviders, invitedUser })
  const onSuccess = useOnSuccess()
  const onCancel = useOnCancel()

  if (!invitedUser) return null

  if (
    loggedUser?.email === invitedUser.email ||
    userInvitation?.acceptedAt ||
    (userInvitation && UserInvitations.isExpired(userInvitation))
  ) {
    return (
      <Navigate
        replace
        to={Routes.LoginInvitation.generatePath({ cycleName, assessmentName }, { invitationUuid, lang })}
      />
    )
  }

  return (
    <div className="login-form">
      <Form
        key={invitationUuid}
        action={ApiEndPoint.User.invitationAccept()}
        formDefinition={formDefinition}
        method="post"
        onCancel={onCancel}
        onSuccess={onSuccess}
        validationSchema={validationSchema}
      />

      {showForgotPassword && (
        <Link className="btn-forgot-pwd" to={Routes.LoginResetPassword.generatePath({ assessmentName, cycleName })}>
          {t('login.forgotPassword')}
        </Link>
      )}
    </div>
  )
}

export default InvitationLocal

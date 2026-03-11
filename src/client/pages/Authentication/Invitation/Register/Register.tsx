import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Assessments } from 'meta/assessment/assessments'
import { AuthProvider } from 'meta/user/auth'
import { Users } from 'meta/user/users'

import Icon from 'client/components/Icon'
import ButtonGoogle from 'client/pages/Authentication/ButtonGoogle'
import Divider from 'client/pages/Authentication/Divider'
import FormLogin from 'client/pages/Authentication/FormLogin'
import { useOnSuccess } from 'client/pages/Authentication/FormLogin/hooks/useOnSuccess'
import { useData } from 'client/pages/Authentication/Invitation/hooks/useData'
import PrivacyNotice from 'client/pages/Authentication/Invitation/PrivacyNotice'
import { videoResources } from 'client/pages/Tutorials'

const Register: React.FC = () => {
  const { i18n, t } = useTranslation()
  const data = useData()
  const onSuccess = useOnSuccess()

  if (!data) return null

  const { assessmentName, cycleName, user, userInvitation, userProviders } = data
  const { countryIso, uuid: invitationUuid } = userInvitation

  const invitationMessageParams = {
    assessment: t(Assessments.getShortLabel(assessmentName)),
    country: t(`area.${countryIso}.listName`),
    cycle: cycleName,
    role: t(Users.getI18nRoleLabelKey(userInvitation.role)),
  }

  const showPassword2 = !userProviders?.includes(AuthProvider.local)
  const authProviderNames = userProviders?.join(', ') ?? ''

  return (
    <div className="login-form">
      <h3>{t('login.invitationMessage', invitationMessageParams)}</h3>

      {userProviders && userProviders.length > 0 && (
        <h3>{t('login.invitationProvidersRegistered', { authProviderNames })}</h3>
      )}

      <FormLogin
        action={ApiEndPoint.Auth.login()}
        disableEmail
        email={user?.email}
        invitationUuid={invitationUuid}
        labels={{ submit: t('login.acceptInvitationWithFra') }}
        onSuccess={onSuccess}
        password2={showPassword2}
      />

      <a
        className="btn-help"
        href={videoResources[0].url[i18n.resolvedLanguage] ?? videoResources[0].url.en}
        rel="noreferrer"
        target="_blank"
      >
        <Icon name="video" /> {t(videoResources[0].labelKeyShort)}
      </a>

      <Divider />

      <ButtonGoogle data={data} label="login.acceptInvitationWithGoogle" />

      <a
        className="btn-help"
        href={videoResources[1].url[i18n.resolvedLanguage] ?? videoResources[1].url.en}
        rel="noreferrer"
        target="_blank"
      >
        <Icon name="video" /> {t(videoResources[1].labelKeyShort)}
      </a>
      <PrivacyNotice />
    </div>
  )
}

export default Register

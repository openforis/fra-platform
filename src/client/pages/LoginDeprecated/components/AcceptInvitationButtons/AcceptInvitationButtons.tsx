import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Assessments } from 'meta/assessment/assessments'
import { LoginInvitationQueryParams } from 'meta/routes/queryParams/invitation'
import { Routes } from 'meta/routes/routes'
import { AuthProvider } from 'meta/user/auth'

import { useAcceptInvitationForm, useInvitation } from 'client/store/login/hooks/invitation'
import { useLoginInfo } from 'client/store/login/hooks/login'
import { useIsInvitationLocalRoute } from 'client/hooks/routes'
import { useSearchParams } from 'client/hooks/searchParams'
import Button, { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'
import { videoResources } from 'client/pages/Tutorials'

import { useOnAcceptInvitationLocal } from './hooks/useOnAcceptInvitationLocal'

const AcceptInvitationButtons: React.FC = () => {
  const { i18n, t } = useTranslation()
  const navigate = useNavigate()

  const { invitationUuid, lang } = useSearchParams<LoginInvitationQueryParams>()
  const linkClassName = useButtonClassName({ size: ButtonSize.l })
  const { assessment, invitedUser, userInvitation, userProviders } = useInvitation()
  const { countryIso } = userInvitation

  const cycle = Assessments.getCycle({ assessment, cycleUuid: userInvitation.cycleUuid })
  const assessmentName = assessment?.props.name
  const cycleName = cycle?.name

  const isInInvitationLocal = useIsInvitationLocalRoute()

  const formData = useAcceptInvitationForm()
  const loginInfo = useLoginInfo()

  const showPassword2 =
    (invitedUser && !userProviders) || (userProviders && !userProviders.includes(AuthProvider.local))

  const onAcceptInvitationLocal = useOnAcceptInvitationLocal({ formData, invitationUuid, showPassword2 })

  const goToAcceptInvitationLocal = (): void => {
    navigate(Routes.LoginInvitationLocal.generatePath({ assessmentName, cycleName }, { invitationUuid, lang }))
  }

  return (
    <>
      <Button
        disabled={isInInvitationLocal ? loginInfo?.isLoading : false}
        label={t('login.acceptInvitationWithFra')}
        onClick={isInInvitationLocal ? onAcceptInvitationLocal : goToAcceptInvitationLocal}
        size={ButtonSize.l}
      />

      <a
        className="btn-help"
        href={videoResources[0].url[i18n.resolvedLanguage] ?? videoResources[0].url.en}
        rel="noreferrer"
        target="_blank"
      >
        <Icon name="video" /> {t(videoResources[0].labelKeyShort)}
      </a>

      <div className="divider" />

      <a
        className={linkClassName}
        href={`${ApiEndPoint.Auth.google()}?assessmentName=${assessmentName}&countryIso=${countryIso}&cycleName=${cycleName}&invitationUuid=${invitationUuid}`}
      >
        {t('login.acceptInvitationWithGoogle')}
      </a>

      <a
        className="btn-help"
        href={videoResources[1].url[i18n.resolvedLanguage] ?? videoResources[1].url.en}
        rel="noreferrer"
        target="_blank"
      >
        <Icon name="video" /> {t(videoResources[1].labelKeyShort)}
      </a>
    </>
  )
}

export default AcceptInvitationButtons

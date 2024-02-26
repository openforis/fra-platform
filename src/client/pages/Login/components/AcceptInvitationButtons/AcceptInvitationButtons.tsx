import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { LoginInvitationQueryParams, Routes } from 'meta/routes'
import { AuthProvider } from 'meta/user'

import { useInvitation } from 'client/store/login'
import { useAcceptInvitationForm, useLoginInfo } from 'client/store/login/hooks'
import { useIsInvitationLocalRoute } from 'client/hooks/useIsRoute'
import { useSearchParams } from 'client/hooks/useSearchParams'
import Icon from 'client/components/Icon'
import { videoResources } from 'client/pages/Tutorials'

import { useOnAcceptInvitationLocal } from './hooks/useOnAcceptInvitationLocal'

const AcceptInvitationButtons: React.FC = () => {
  const { i18n, t } = useTranslation()
  const navigate = useNavigate()

  const { invitationUuid, lang } = useSearchParams<LoginInvitationQueryParams>()
  const { assessment, invitedUser, userProviders, userRole } = useInvitation()

  const cycle = assessment?.cycles.find((cycle) => cycle.uuid === userRole.cycleUuid)
  const assessmentName = assessment?.props.name
  const cycleName = cycle?.name

  const isInInvitationLocal = useIsInvitationLocalRoute()

  const formData = useAcceptInvitationForm()
  const loginInfo = useLoginInfo()

  const showPassword2 =
    (invitedUser && !userProviders) || (userProviders && !userProviders.includes(AuthProvider.local))

  const onAcceptInvitationLocal = useOnAcceptInvitationLocal({ formData, invitationUuid, showPassword2 })

  const goToAcceptInvitationLocal = () => {
    navigate(Routes.LoginInvitationLocal.generatePath({ assessmentName, cycleName }, { invitationUuid, lang }))
  }

  return (
    <>
      <button
        type="button"
        className="btn"
        onClick={isInInvitationLocal ? onAcceptInvitationLocal : goToAcceptInvitationLocal}
        disabled={isInInvitationLocal ? loginInfo?.isLoading : false}
      >
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
    </>
  )
}

export default AcceptInvitationButtons

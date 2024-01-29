import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { LoginInvitationQueryParams } from 'meta/routes'

import { useInvitation } from 'client/store/login'
import { useSearchParams } from 'client/hooks/useSearchParams'
import Icon from 'client/components/Icon'
import { videoResources } from 'client/pages/Tutorials'

type Props = {
  onAcceptInvitationLocalClick: () => void
}

const AcceptInvitationButtons: React.FC<Props> = (props) => {
  const { onAcceptInvitationLocalClick } = props
  const { i18n, t } = useTranslation()

  const { invitationUuid } = useSearchParams<LoginInvitationQueryParams>()
  const { userRole, assessment } = useInvitation()

  const cycle = assessment?.cycles.find((cycle) => cycle.uuid === userRole.cycleUuid)
  const assessmentName = assessment?.props.name
  const cycleName = cycle?.name

  return (
    <>
      <button type="button" className="btn" onClick={onAcceptInvitationLocalClick}>
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

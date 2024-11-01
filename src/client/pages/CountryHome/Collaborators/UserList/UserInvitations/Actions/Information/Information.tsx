import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Routes } from 'meta/routes'
import { UserInvitationSummary } from 'meta/user'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useToaster } from 'client/hooks/useToaster'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

interface Props {
  invitationSummary: UserInvitationSummary
}

const Information: React.FC<Props> = (props: Props) => {
  const { invitationSummary } = props
  const { uuid: invitationUuid, lang } = invitationSummary
  const assessment = useAssessment()
  const cycle = useCycle()
  const { t } = useTranslation()
  const { toaster } = useToaster()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const url = `${window.location.origin}${Routes.LoginInvitation.generatePath(
    { assessmentName, cycleName },
    { invitationUuid, lang }
  )}`

  const onClick = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => {
      toaster.info(t('userManagement.invitationLinkCopied'))
    })
  }, [t, toaster, url])

  // TODO: Add tooltip: "Copy invitation link"
  return <Button iconName="content_copy" inverse onClick={onClick} size={ButtonSize.s} type={ButtonType.black} />
}

export default Information

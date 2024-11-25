import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { Routes } from 'meta/routes'
import { UserInvitations as UserInvitationMeta } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

import { Props } from '../../Props'

const CopyLink: React.FC<Props> = (props: Props) => {
  const { user } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()
  const { toaster } = useToaster()

  const { invitation } = CountryUserSummaries.getCountryRoleAndInvitation(user, countryIso)

  const onClick = useCallback(() => {
    const { lang } = user
    const { uuid: invitationUuid } = invitation

    const { origin } = window.location
    const invitationPath = Routes.LoginInvitation.generatePath({ assessmentName, cycleName }, { invitationUuid, lang })
    const url = `${origin}${invitationPath}`

    navigator.clipboard.writeText(url).then(() => {
      toaster.info(t('userManagement.invitationLinkCopied'))
    })
  }, [assessmentName, user, cycleName, invitation, t, toaster])

  const isInvitation = CountryUserSummaries.isInvitation(user, countryIso)

  if (!isInvitation || UserInvitationMeta.isExpired(invitation)) {
    return null
  }

  const label = t('common.copyLink')

  return (
    <Button
      iconName="content_copy"
      inverse
      label={label}
      onClick={onClick}
      size={ButtonSize.s}
      type={ButtonType.primary}
    />
  )
}

export default CopyLink

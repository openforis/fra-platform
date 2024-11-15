import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { Routes } from 'meta/routes'
import { CountryUserSummary, UserInvitations as UserInvitationMeta } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

interface Props {
  countryUserSummary: CountryUserSummary
}

const CopyLink: React.FC<Props> = (props: Props) => {
  const { countryUserSummary } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()
  const { toaster } = useToaster()

  const { invitation } = CountryUserSummaries.getCountryRoleAndInvitation(countryUserSummary, countryIso)

  const onClick = useCallback(() => {
    const { lang } = countryUserSummary
    const { uuid: invitationUuid } = invitation

    const { origin } = window.location
    const invitationPath = Routes.LoginInvitation.generatePath({ assessmentName, cycleName }, { invitationUuid, lang })
    const url = `${origin}${invitationPath}`

    navigator.clipboard.writeText(url).then(() => {
      toaster.info(t('userManagement.invitationLinkCopied'))
    })
  }, [assessmentName, countryUserSummary, cycleName, invitation, t, toaster])

  const isInvitation = CountryUserSummaries.isInvitation(countryUserSummary, countryIso)

  if (!isInvitation || UserInvitationMeta.isExpired(invitation)) {
    return null
  }

  // TODO:  Add tooltip: "Copy invitation link"
  //        (Requires either wrapping with div or Button component support tooltip params)
  return <Button iconName="content_copy" inverse onClick={onClick} size={ButtonSize.s} type={ButtonType.black} />
}

export default CopyLink

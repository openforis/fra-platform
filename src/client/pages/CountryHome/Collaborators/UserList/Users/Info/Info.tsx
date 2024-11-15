import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { CountryIso } from 'meta/area'
import { TooltipId } from 'meta/tooltip'
import { CountryUserSummary, UserInvitations as UserInvitationMeta } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

type Props = {
  countryUserSummary: CountryUserSummary
}

const Info: React.FC<Props> = (props: Props) => {
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { countryUserSummary } = props

  const { t } = useTranslation()

  const isInvitation = CountryUserSummaries.isInvitation(countryUserSummary, countryIso)
  if (!isInvitation) return null

  const { invitation } = CountryUserSummaries.getCountryRoleAndInvitation(countryUserSummary, countryIso)

  const expired = UserInvitationMeta.isExpired(invitation)

  const dataTooltipContent = t(expired ? 'login.invitationExpired' : 'admin.invitationPending')
  const dataTooltipId = t(expired ? TooltipId.error : TooltipId.info)

  return (
    <div data-tooltip-content={dataTooltipContent} data-tooltip-id={dataTooltipId}>
      <Icon className={classNames({ expired })} name="round-e-info" />
    </div>
  )
}

export default Info

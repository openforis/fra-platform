import React from 'react'

import { CountryIso } from 'meta/area'
import { CountryUserSummary } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

import { useResendInvitation } from '../hooks/useResendInvitation'

interface Props {
  countryUserSummary: CountryUserSummary
}

const Information: React.FC<Props> = (props: Props) => {
  const { countryUserSummary } = props
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { resendInvitation, isLoading } = useResendInvitation({ countryUserSummary })

  if (!CountryUserSummaries.isInvitation(countryUserSummary, countryIso)) {
    return null
  }

  // TODO:  Add tooltip: 'userManagement.inviteAgain'
  //        (Requires either wrapping with div or Button component support tooltip params)
  return (
    <Button
      disabled={isLoading}
      iconName="icon-paper-plane"
      inverse
      onClick={resendInvitation}
      size={ButtonSize.s}
      type={ButtonType.primary}
    />
  )
}

export default Information

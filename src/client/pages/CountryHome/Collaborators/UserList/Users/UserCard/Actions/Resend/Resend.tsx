import React from 'react'

import { CountryIso } from 'meta/area'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

import { Props } from '../../Props'
import { useResendInvitation } from '../hooks/useResendInvitation'

const Information: React.FC<Props> = (props: Props) => {
  const { user } = props
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { resendInvitation, isLoading } = useResendInvitation({ user })

  if (!CountryUserSummaries.isInvitation(user, countryIso)) {
    return null
  }

  return (
    <Button
      disabled={isLoading}
      iconName="rotate"
      label="Invite again"
      onClick={resendInvitation}
      size={ButtonSize.s}
      type={ButtonType.primary}
    />
  )
}

export default Information

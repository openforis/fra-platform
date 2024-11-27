import React from 'react'
import { useTranslation } from 'react-i18next'

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

  const { t } = useTranslation()

  if (!CountryUserSummaries.isInvitation(user, countryIso)) {
    return null
  }

  const label = t('common.inviteAgain')

  return (
    <Button
      className="home-user-action-button-resend"
      disabled={isLoading}
      iconName="rotate"
      label={label}
      onClick={resendInvitation}
      size={ButtonSize.s}
      type={ButtonType.primary}
    />
  )
}

export default Information

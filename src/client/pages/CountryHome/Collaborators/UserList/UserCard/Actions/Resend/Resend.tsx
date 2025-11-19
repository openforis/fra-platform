import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { UserCountrySummaries } from 'meta/user/countrySummaries'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

import { Props } from '../../Props'
import { useResendInvitation } from '../hooks/useResendInvitation'

const Information: React.FC<Props> = (props: Props) => {
  const { user } = props
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { isLoading, resendInvitation } = useResendInvitation({ user })

  const { t } = useTranslation()

  if (!UserCountrySummaries.isInvitation(user, countryIso)) {
    return null
  }

  return (
    <Button
      className="home-user-action-button-resend"
      disabled={isLoading}
      iconName="rotate"
      label={t('common.inviteAgain')}
      onClick={resendInvitation}
      size={ButtonSize.xs}
      type={ButtonType.primary}
    />
  )
}

export default Information

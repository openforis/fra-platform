import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { CountryUserSummary } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

import { useRemoveInvitation } from './hooks/useRemoveInvitation'

interface Props {
  countryUserSummary: CountryUserSummary
}

const Remove: React.FC<Props> = (props: Props) => {
  const { countryUserSummary } = props

  const { countryIso } = useCountryRouteParams<CountryIso>()

  const { t } = useTranslation()
  const { toaster } = useToaster()
  const currentUser = useUser()

  const callback = useCallback(() => {
    toaster.success(t('userManagement.invitationDeleted'))
  }, [toaster, t])

  const removeInvitation = useRemoveInvitation({ countryUserSummary, callback })

  if (!CountryUserSummaries.isInvitation(countryUserSummary, countryIso)) {
    return null
  }

  const disabled = currentUser.uuid === countryUserSummary.uuid

  // TODO:  Add tooltip: 'userManagement.inviteAgain'
  //        (Requires either wrapping with div or Button component support tooltip params)
  return (
    <Button
      disabled={disabled}
      iconName="trash-simple"
      inverse
      onClick={removeInvitation}
      size={ButtonSize.s}
      type={ButtonType.danger}
    />
  )
}

export default Remove

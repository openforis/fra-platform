import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

import type { Props } from '../../Props'
import { useRemoveInvitation } from './hooks/useRemoveInvitation'

const Remove: React.FC<Props> = (props: Props) => {
  const { user } = props

  const { countryIso } = useCountryRouteParams<CountryIso>()

  const { t } = useTranslation()
  const { toaster } = useToaster()
  const currentUser = useUser()

  const callback = useCallback(() => {
    toaster.error(t('userManagement.invitationDeleted'))
  }, [toaster, t])

  const removeInvitation = useRemoveInvitation({ user, callback })

  if (!CountryUserSummaries.isInvitation(user, countryIso)) {
    return null
  }

  const disabled = currentUser.uuid === user.uuid

  const label = t('common.remove')

  return (
    <Button
      disabled={disabled}
      iconName="trash-simple"
      inverse
      label={label}
      onClick={removeInvitation}
      size={ButtonSize.s}
      type={ButtonType.danger}
    />
  )
}

export default Remove

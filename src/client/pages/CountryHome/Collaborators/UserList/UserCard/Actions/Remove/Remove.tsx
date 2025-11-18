import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { UserCountrySummaries } from 'meta/user/countrySummaries'

import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useToaster } from 'client/hooks/toaster'
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
    toaster.info(t('userManagement.invitationDeleted'))
  }, [t, toaster])

  const removeInvitation = useRemoveInvitation({ user, callback })

  if (!UserCountrySummaries.isInvitation(user, countryIso)) {
    return null
  }

  return (
    <Button
      className="home-user-action-button-remove"
      disabled={currentUser.uuid === user.uuid}
      iconName="trash-simple"
      inverse
      label={t('common.remove')}
      noBorder
      onClick={removeInvitation}
      size={ButtonSize.xs}
      type={ButtonType.danger}
    />
  )
}

export default Remove

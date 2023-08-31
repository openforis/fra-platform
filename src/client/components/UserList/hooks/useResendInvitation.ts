import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  invitationUuid: string
  callback: () => void
}

export const useResendInvitation = (props: Props) => {
  const { invitationUuid, callback } = props
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  return useCallback(() => {
    dispatch(
      UserManagementActions.sendInvitationEmail({
        assessmentName,
        countryIso: countryIso as CountryIso,
        cycleName,
        invitationUuid,
      })
    ).then(callback)
  }, [dispatch, assessmentName, countryIso, cycleName, invitationUuid, callback])
}

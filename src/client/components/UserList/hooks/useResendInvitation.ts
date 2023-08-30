import { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryIso } from 'client/hooks'

type Props = {
  invitationUuid: string
  callback: () => void
}

export const useResendInvitation = (props: Props) => {
  const { invitationUuid, callback } = props
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return useCallback(() => {
    dispatch(
      UserManagementActions.sendInvitationEmail({
        assessmentName,
        countryIso,
        cycleName,
        invitationUuid,
      })
    ).then(callback)
  }, [dispatch, assessmentName, countryIso, cycleName, invitationUuid, callback])
}

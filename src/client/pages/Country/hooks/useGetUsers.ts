import { useEffect } from 'react'

import { Authorizer } from 'meta/user'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useAppDispatch } from 'client/store/hooks'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

export default () => {
  const dispatch = useAppDispatch()

  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const user = useUser()

  useEffect(() => {
    if (Authorizer.canViewUsers({ countryIso, cycle, user })) {
      dispatch(
        UserManagementActions.getUsers({ countryIso, assessmentName: assessment.props.name, cycleName: cycle.name })
      )
    }
  }, [assessment, countryIso, cycle, dispatch, user])
}

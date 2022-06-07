import React, { useEffect } from 'react'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/userManagement'
import { useUsers } from '@client/store/userManagement/hooks'
import { useCountryIso } from '@client/hooks'
import InviteUserForm from '@client/components/InviteUserForm'
import UserList from '@client/components/UserList'

const Collaborators: React.FC = () => {
  const dispatch = useAppDispatch()

  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const users = useUsers()

  useEffect(() => {
    dispatch(
      UserManagementActions.getUsers({ countryIso, assessmentName: assessment.props.name, cycleName: cycle.name })
    )
  }, [countryIso])

  return (
    <>
      <InviteUserForm />
      <UserList users={users} />
    </>
  )
}

export default Collaborators

import React from 'react'

import { User, Users } from 'meta/user'

import { useCycle } from 'client/store/meta/assessment/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import SelectField from 'client/components/EditUserForm/SelectField'

import { useOnChange } from './hooks/useOnChange'
import { useOptions } from './hooks/useOptions'

type Props = {
  enabled: boolean
  target: User
}

const UserCountryRoleSelector: React.FC<Props> = (props: Props) => {
  const { enabled, target } = props
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()

  const userRole = Users.getRole(target, countryIso, cycle)

  const options = useOptions()
  const onChange = useOnChange(target)

  return <SelectField enabled={enabled} name="role" onChange={onChange} options={options} value={userRole.role} />
}

export default UserCountryRoleSelector

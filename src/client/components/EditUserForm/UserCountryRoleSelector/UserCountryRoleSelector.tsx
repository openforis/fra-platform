import React from 'react'

import { User, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import SelectField from 'client/components/EditUserForm/SelectField'
import { useOnChange } from 'client/components/EditUserForm/UserCountryRoleSelector/hooks/useOnChange'
import { useOptions } from 'client/components/EditUserForm/UserCountryRoleSelector/hooks/useOptions'

type Props = {
  enabled: boolean
  user: User
}

const UserCountryRoleSelector: React.FC<Props> = (props: Props) => {
  const { enabled, user } = props
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()

  const userRole = Users.getRole(user, countryIso, cycle)

  const options = useOptions()
  const onChange = useOnChange(user)

  return (
    <SelectField
      placeholder={false}
      onChange={onChange}
      name="role"
      options={options}
      value={userRole.role}
      enabled={enabled}
    />
  )
}

export default UserCountryRoleSelector

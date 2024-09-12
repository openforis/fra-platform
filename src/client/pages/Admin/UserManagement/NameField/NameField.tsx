import React from 'react'

import { User, Users } from 'meta/user'

type Props = {
  user: User
}

const NameField: React.FC<Props> = (props: Props) => {
  const { user } = props

  return <span className="admin-user-management-cell">{Users.getFullName(user)}</span>
}

export default NameField

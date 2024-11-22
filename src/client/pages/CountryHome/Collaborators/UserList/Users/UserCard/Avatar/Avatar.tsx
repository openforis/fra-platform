import './Avatar.scss'
import React from 'react'

import { CountryUserSummary, Users } from 'meta/user'

type Props = {
  user: CountryUserSummary
}

const Avatar: React.FC<Props> = (props: Props) => {
  const { user } = props
  return (
    <div className="user-avatar">
      <img alt={user.fullName} src={Users.profilePictureUri(user.id)} />
    </div>
  )
}

export default Avatar

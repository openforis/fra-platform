import './Avatar.scss'
import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { UserCountrySummary } from 'meta/user/countrySummary'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

type Props = {
  user: User | UserCountrySummary
}

const Avatar: React.FC<Props> = (props: Props) => {
  const { user } = props

  const alt = 'fullName' in user ? user.fullName : Users.getFullName(user)
  const src = ApiEndPoint.User.profilePicture(String(user.id))

  return (
    <div className="user-avatar">
      <img alt={alt} src={src} />
    </div>
  )
}

export default Avatar

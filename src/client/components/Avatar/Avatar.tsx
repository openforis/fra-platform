import './Avatar.scss'
import React from 'react'

import { CountryUserSummary, User, Users } from 'meta/user'

type Props = {
  user: User | CountryUserSummary
}

const Avatar: React.FC<Props> = (props: Props) => {
  const { user } = props

  const alt = 'fullName' in user ? user.fullName : Users.getFullName(user)
  const src = Users.profilePictureUri(user.id)

  return (
    <div className="user-avatar">
      <img alt={alt} src={src} />
    </div>
  )
}

export default Avatar

import './UserCard.scss'
import React from 'react'

import classNames from 'classnames'

import { CountryIso } from 'meta/area'
import { UserInvitations } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Avatar from 'client/components/Avatar'

import Actions from './Actions'
import Info from './Info'
import { Props } from './Props'

const UserCard: React.FC<Props> = (props) => {
  const { user } = props
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { invitation: _invitation } = CountryUserSummaries.getCountryRoleAndInvitation(user, countryIso)

  const invitation = CountryUserSummaries.isInvitation(user, countryIso)
  const expired = invitation && UserInvitations.isExpired(_invitation)

  return (
    <div className={classNames('user-card', { invitation, expired })}>
      <Avatar user={user} />
      <Info user={user} />
      <Actions user={user} />
    </div>
  )
}

export default UserCard

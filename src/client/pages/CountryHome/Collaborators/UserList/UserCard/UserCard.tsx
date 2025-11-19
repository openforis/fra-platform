import './UserCard.scss'
import React from 'react'

import classNames from 'classnames'

import { CountryIso } from 'meta/area/countryIso'
import { UserCountrySummaries } from 'meta/user/countrySummaries'
import { UserInvitations } from 'meta/user/invitations'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import Avatar from 'client/components/Avatar'

import Actions from './Actions'
import Info from './Info'
import { Props } from './Props'

const UserCard: React.FC<Props> = (props) => {
  const { user } = props
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { invitation: _invitation } = UserCountrySummaries.getCountryRoleAndInvitation(user, countryIso)

  const invitation = UserCountrySummaries.isInvitation(user, countryIso)
  const expired = invitation && UserInvitations.isExpired(_invitation)

  return (
    <div className={classNames('home-user-card', { invitation, expired })}>
      <Avatar user={user} />
      <Info user={user} />
      <Actions user={user} />
    </div>
  )
}

export default UserCard

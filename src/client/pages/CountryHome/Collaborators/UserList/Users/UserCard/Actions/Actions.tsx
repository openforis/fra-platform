import './Actions.scss'
import React from 'react'

import { CountryIso } from 'meta/area'
import { UserInvitations } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCanSeeUserActivities, useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Hr from 'client/components/Hr'

import { Props } from '../Props'
import Resend from './Resend/Resend'
import CopyLink from './CopyLink'
import Edit from './Edit'
import Message from './Message'
import Remove from './Remove'

type ActionType = {
  Component: React.FC<Props>
  name: string
}

const useActions = (props: Props) => {
  const { user } = props
  const currentUser = useUser()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  const { invitation } = CountryUserSummaries.getCountryRoleAndInvitation(user, countryIso)

  const isInvitation = CountryUserSummaries.isInvitation(user, countryIso)
  const expired = invitation && UserInvitations.isExpired(invitation)

  const canCurrentUserSeeUserActivities = useCanSeeUserActivities(currentUser)
  const canTargetUserSeeUserActivities = useCanSeeUserActivities(user)

  // List of actions available to the user
  const actions: Array<ActionType> = []

  if (isInvitation) {
    actions.push({ name: 'resend', Component: Resend })
    // Allow copying the link only when the invitation is not expired
    if (!expired) {
      actions.push({ name: 'copy', Component: CopyLink })
    }
    actions.push({ name: 'remove', Component: Remove })
  }

  if (!isInvitation) {
    // If the user or target cannot send/receive messages, hide message button
    const canSendOrReceiveMessage = canCurrentUserSeeUserActivities && canTargetUserSeeUserActivities
    // If viewing self, return hide message button
    const isSelf = user.uuid === currentUser.uuid

    if (canSendOrReceiveMessage && !isSelf) {
      actions.push({ name: 'message', Component: Message })
    }

    actions.push({ name: 'edit', Component: Edit })
  }
  return actions
}

const Actions: React.FC<Props> = (props: Props) => {
  const { user } = props
  const actions = useActions(props)

  return (
    <div className="user-actions">
      {actions.map(({ name, Component }, i) => {
        const isLast = i === actions.length - 1
        return (
          <React.Fragment key={`user-action-button-${name}`}>
            <Component user={user} />
            {!isLast && <Hr />}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Actions

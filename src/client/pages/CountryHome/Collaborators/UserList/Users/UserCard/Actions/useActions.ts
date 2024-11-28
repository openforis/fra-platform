import React from 'react'

import { CountryIso } from 'meta/area'
import { UserInvitations, Users } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCycle } from 'client/store/assessment'
import { useCanSeeUserActivities, useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { Props } from '../Props'
import CopyLink from './CopyLink'
import Edit from './Edit'
import Message from './Message'
import Remove from './Remove'
import Resend from './Resend'

type ActionType = {
  Component: React.FC<Props>
  name: string
}

export const useActions = (props: Props): Array<ActionType> => {
  const { user } = props
  const currentUser = useUser()
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()

  const isReviewer = Users.isReviewer(currentUser, countryIso, cycle)

  const { invitation } = CountryUserSummaries.getCountryRoleAndInvitation(user, countryIso)

  const isInvitation = CountryUserSummaries.isInvitation(user, countryIso)
  const expired = invitation && UserInvitations.isExpired(invitation)

  const canCurrentUserSeeUserActivities = useCanSeeUserActivities(currentUser)
  const canTargetUserSeeUserActivities = useCanSeeUserActivities(user)

  // List of actions available to the user
  const actions: Array<ActionType> = []

  // Reviewer cannot access invitation actions
  if (isInvitation && !isReviewer) {
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

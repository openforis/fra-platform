import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { UserInvitation } from 'meta/user/invitation'
import { UserProps } from 'meta/user/user'

// invited user: uuid, name and invited role
type InvitationTarget = Pick<UserInvitation, 'role' | 'userUuid'> & { user: UserProps['name'] }

export type UserTargets = {
  [ActivityLogMessage.invitationAccept]: InvitationTarget
  [ActivityLogMessage.invitationAdd]: InvitationTarget
  [ActivityLogMessage.invitationRemove]: InvitationTarget
}

export type ActivityLogInvitationAccept = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.invitationAccept>,
  ActivityLogMessage.invitationAccept
>

export type ActivityLogInvitationAdd = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.invitationAdd>,
  ActivityLogMessage.invitationAdd
>

export type ActivityLogInvitationRemove = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.invitationRemove>,
  ActivityLogMessage.invitationRemove
>

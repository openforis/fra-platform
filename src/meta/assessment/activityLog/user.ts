import { CountryIso } from 'meta/area/countryIso'
import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogTarget } from 'meta/assessment/activityLog/target'
import { UserInvitation } from 'meta/user/invitation'
import { RoleName } from 'meta/user/role/name'
import { UserRole, UserRoleExtended } from 'meta/user/role/role'
import { User, UserProps } from 'meta/user/user'

// invited user: uuid, name and invited role
type InvitationTarget = Pick<UserInvitation, 'role' | 'userUuid'> & { user: UserProps['name'] }

// updated role of the target user
type UserRoleTarget = { roles: Array<UserRoleExtended<RoleName>>; userUuid: User['uuid'] }

export type UserTargets = {
  [ActivityLogMessage.invitationAccept]: InvitationTarget
  [ActivityLogMessage.invitationAdd]: InvitationTarget
  [ActivityLogMessage.invitationRemove]: InvitationTarget
  [ActivityLogMessage.userUpdate]: { user: Omit<User, 'roles'> }
  [ActivityLogMessage.userRoleUpdatePermissions]: UserRoleTarget
  [ActivityLogMessage.userRoleUpdateProps]: UserRoleTarget
  [ActivityLogMessage.userRoleUpdateRole]: UserRoleTarget
  [ActivityLogMessage.userRolesUpdate]: { roles: Array<Pick<UserRole, 'countryIso' | 'role'>>; userUuid: User['uuid'] }
  [ActivityLogMessage.userRoleDeleteRole]: {
    countryIso: CountryIso
    role: RoleName
    user: string
    userUuid: User['uuid']
  }
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

export type ActivityLogUserUpdate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.userUpdate>,
  ActivityLogMessage.userUpdate
>

export type ActivityLogUserRoleDeleteRole = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.userRoleDeleteRole>,
  ActivityLogMessage.userRoleDeleteRole
>

export type ActivityLogUserRolesUpdate = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.userRolesUpdate>,
  ActivityLogMessage.userRolesUpdate
>

export type ActivityLogUserRoleUpdatePermissions = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.userRoleUpdatePermissions>,
  ActivityLogMessage.userRoleUpdatePermissions
>

export type ActivityLogUserRoleUpdateProps = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.userRoleUpdateProps>,
  ActivityLogMessage.userRoleUpdateProps
>

export type ActivityLogUserRoleUpdateRole = ActivityLog<
  ActivityLogTarget<ActivityLogMessage.userRoleUpdateRole>,
  ActivityLogMessage.userRoleUpdateRole
>

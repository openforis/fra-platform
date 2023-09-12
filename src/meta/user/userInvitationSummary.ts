import { RoleName, UserRole } from 'meta/user/userRole'

export type UserInvitationSummary = UserRole<RoleName> & { email: string }

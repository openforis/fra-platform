import { Assessment } from 'meta/assessment/assessment'
import { AuthProvider } from 'meta/user/auth'
import { UserInvitation } from 'meta/user/invitation'
import { User } from 'meta/user/user'

export type InvitationData = {
  assessment: Assessment
  user: User
  userProviders: Array<AuthProvider>
  userInvitation: UserInvitation
}

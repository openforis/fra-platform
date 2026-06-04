import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { AuthProvider } from 'meta/user/auth'
import { UserInvitation } from 'meta/user/invitation'
import { User } from 'meta/user/user'

export type InvitationData = {
  assessmentName: AssessmentName
  cycleName: CycleName
  user: User
  userInvitation: UserInvitation
  userProviders: Array<AuthProvider>
}

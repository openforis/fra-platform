import { Assessment } from 'meta/assessment'
import { AuthProvider, RoleName, User, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
import { UserRepository } from 'server/repository/public/user'
import { UserInvitationRepository } from 'server/repository/public/userInvitation'
import { UserProviderRepository } from 'server/repository/public/userProvider'

export const findByInvitation = async (
  props: { invitationUuid: string },
  client: BaseProtocol = DB
): Promise<{
  assessment: Assessment
  user: User
  userProviders: Array<AuthProvider>
  userRole: UserRole<RoleName>
}> => {
  const { invitationUuid } = props

  const userRole = await UserInvitationRepository.getOne({ invitationUuid }, client)

  const user = await UserRepository.getOne({ id: userRole.userId }, client)

  const userProviders = await UserProviderRepository.getUserProviders({ user }, client)

  const assessment = await AssessmentRepository.getOne({ id: userRole.assessmentId }, client)
  return {
    assessment,
    user,
    userProviders,
    userRole,
  }
}

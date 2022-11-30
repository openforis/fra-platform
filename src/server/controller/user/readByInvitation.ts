import { Assessment } from '@meta/assessment'
import { AuthProvider, RoleName, User, UserRole } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository/assessment/assessment'
import { UserRepository } from '@server/repository/public/user'
import { UserProviderRepository } from '@server/repository/public/userProvider'
import { UserRoleRepository } from '@server/repository/public/userRole'

export const readByInvitation = async (
  props: { invitationUuid: string },
  client: BaseProtocol = DB
): Promise<{
  assessment: Assessment
  user: User
  userProviders: Array<AuthProvider>
  userRole: UserRole<RoleName>
}> => {
  const { invitationUuid } = props

  const userRole = await UserRoleRepository.read({ invitationUuid }, client)

  const user = await UserRepository.getOne({ id: userRole.userId }, client)

  const userProviders = await UserProviderRepository.getUserProviders({ user }, client)

  const assessment = await AssessmentRepository.read({ id: userRole.assessmentId }, client)
  return {
    assessment,
    user,
    userProviders,
    userRole,
  }
}

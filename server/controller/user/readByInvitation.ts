import { Assessment } from '@meta/assessment'
import { RoleName, User, UserRole } from '@meta/user'
import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository/assessment/assessment'
import { UserRepository } from '@server/repository/public/user'
import { UserRoleRepository } from '@server/repository/public/userRole'

export const readByInvitation = async (
  props: {
    invitationUuid: string
  },
  client: BaseProtocol = DB
): Promise<{ userRole: UserRole<RoleName>; assessment: Assessment; user: User }> => {
  const { invitationUuid } = props

  return client.tx(async (t) => {
    const userRole = await UserRoleRepository.read({ invitationUuid }, t)
    const assessment = await AssessmentRepository.read({ id: userRole.assessmentId }, t)
    const user = await UserRepository.getOne({ id: userRole.userId }, t)
    return {
      userRole,
      assessment,
      user,
    }
  })
}

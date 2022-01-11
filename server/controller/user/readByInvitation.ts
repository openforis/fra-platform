import { BaseProtocol, DB } from '@server/db'
import { Assessment } from '@meta/assessment'
import { User, UserRole, RoleName } from '@meta/user'
import { AssessmentRepository, UserRepository, UserRoleRepository } from '@server/repository'

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
    const user = await UserRepository.read({ user: { id: userRole.userId } }, t)
    return {
      userRole,
      assessment,
      user,
    }
  })
}

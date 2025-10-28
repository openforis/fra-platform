import { Assessment } from 'meta/assessment/assessment'
import { AuthProvider, User, UserInvitation } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { UserRepository } from 'server/db/repository/public/user'
import { UserInvitationRepository } from 'server/db/repository/public/userInvitation'
import { UserProviderRepository } from 'server/db/repository/public/userProvider'
import { AssessmentRedisRepository } from 'server/cache/repository/assessment'

type Props = {
  invitationUuid: string
}

type Returned = {
  assessment: Assessment
  user: User
  userProviders: Array<AuthProvider>
  userInvitation: UserInvitation
}

export const findByInvitation = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { invitationUuid } = props

  const userInvitation = await UserInvitationRepository.getOne({ invitationUuid }, client)
  const user = await UserRepository.getOne({ uuid: userInvitation.userUuid }, client)
  const userProviders = await UserProviderRepository.getUserProviders({ user }, client)
  const assessment = await AssessmentRedisRepository.getOne({ uuid: userInvitation.assessmentUuid }, client)

  return {
    assessment,
    user,
    userProviders,
    userInvitation,
  }
}

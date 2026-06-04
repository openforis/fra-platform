import { Assessments } from 'meta/assessment/assessments'
import { InvitationData } from 'meta/user/invitations/invitation'

import { AssessmentRedisRepository } from 'server/cache/repository/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { UserRepository } from 'server/db/repository/public/user'
import { UserInvitationRepository } from 'server/db/repository/public/userInvitation'
import { UserProviderRepository } from 'server/db/repository/public/userProvider'

type Props = {
  invitationUuid: string
}

export const findByInvitation = async (props: Props, client: BaseProtocol = DB): Promise<InvitationData> => {
  const { invitationUuid } = props

  const userInvitation = await UserInvitationRepository.getOne({ invitationUuid }, client)
  if (!userInvitation) throw new Error('login.noInvitation')

  const user = await UserRepository.getOne({ uuid: userInvitation.userUuid }, client)
  const userProviders = await UserProviderRepository.getUserProviders({ user }, client)
  const assessment = await AssessmentRedisRepository.getOne({ uuid: userInvitation.assessmentUuid }, client)

  const assessmentName = assessment.props.name
  const cycle = Assessments.getCycle({ assessment, cycleUuid: userInvitation.cycleUuid })
  const cycleName = cycle.name

  return {
    assessmentName,
    cycleName,
    user,
    userInvitation,
    userProviders,
  }
}

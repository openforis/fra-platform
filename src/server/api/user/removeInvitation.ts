import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const removeInvitation = async (req: CycleRequest<{ invitationUuid: string }>, res: Response) => {
  try {
    const { countryIso, invitationUuid } = req.query

    const { assessment, userInvitation } = await UserController.findByInvitation({ invitationUuid })

    const assessmentName = assessment.props.name
    const { cycleUuid } = userInvitation
    const { cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleUuid })

    const user = Requests.getUser(req)
    const removeInvitationProps = { assessment, cycle, countryIso, invitationUuid, user }
    const removedUserInvitation = await UserController.removeInvitation(removeInvitationProps)

    // TODO: This has changed
    // { userRole => userInvitation }
    // Update frontend accordingly
    Requests.sendOk(res, removedUserInvitation)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

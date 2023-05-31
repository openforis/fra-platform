import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const removeInvitation = async (req: CycleRequest<{ invitationUuid: string }>, res: Response) => {
  try {
    const { countryIso, invitationUuid } = req.query

    const { assessment, userRole } = await UserController.findByInvitation({ invitationUuid })

    const { cycle } = await AssessmentController.getOneWithCycle({
      assessmentName: assessment.props.name,
      cycleUuid: userRole.cycleUuid,
    })

    const removedUserRole = await UserController.removeInvitation({
      countryIso,
      assessment,
      cycle,
      invitationUuid,
      user: Requests.getUser(req),
    })

    Requests.sendOk(res, removedUserRole)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

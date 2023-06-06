import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const acceptInvitation = async (req: CycleRequest<{ invitationUuid: string }>, res: Response) => {
  try {
    const { invitationUuid } = req.query

    const { user, userRole } = await UserController.findByInvitation({ invitationUuid })

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      id: userRole.assessmentId,
      cycleUuid: userRole.cycleUuid,
    })

    const acceptedUser = await UserController.acceptInvitation({ assessment, cycle, user, userRole })

    Requests.sendOk(res, {
      user: acceptedUser,
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

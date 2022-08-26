import { Request, Response } from 'express'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const acceptInvitation = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params

    const { user, userRole } = await UserController.readByInvitation({ invitationUuid: uuid })

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

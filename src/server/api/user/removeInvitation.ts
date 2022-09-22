import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'

export const removeInvitation = async (req: CycleRequest<{ invitationUuid: string }>, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, invitationUuid } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
    })

    const user = Requests.getRequestUser(req)

    const userRole = await UserController.removeInvitation({
      countryIso,
      assessment,
      cycle,
      invitationUuid,
      user,
    })

    Requests.sendOk(res, userRole)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

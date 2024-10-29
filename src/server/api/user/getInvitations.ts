import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const getInvitations = async (req: CycleRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const invitations = await UserController.getManyInvitations({ assessment, cycle, countryIso, pendingOnly: true })

    Requests.sendOk(res, invitations)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

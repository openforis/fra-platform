import { Request, Response } from 'express'

import { AssessmentName } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const updateUserRoles = async (
  req: Request<{ assessmentName: AssessmentName; cycleName: string; id: string }>,
  res: Response
) => {
  try {
    const { assessmentName, cycleName, roles, userId } = req.body

    const user = Requests.getUser(req)

    const { cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const updatedUser = await UserController.updateUserRoles({
      cycleUuid: cycle.uuid,
      roles,
      userId,
      user,
    })

    Requests.sendOk(res, updatedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

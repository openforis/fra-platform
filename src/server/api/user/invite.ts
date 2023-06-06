import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { RoleName } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const invite = async (
  req: CycleRequest<{
    email: string
    name: string
    role: RoleName
  }>,
  res: Response
) => {
  try {
    const { countryIso, assessmentName, cycleName, email, name, role: roleName } = req.query

    const user = Requests.getUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const { user: invitedUser } = await UserController.invite({
      countryIso,
      assessment,
      cycle,
      name,
      email,
      roleName,
      user,
    })

    Requests.sendOk(res, invitedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

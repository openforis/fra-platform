import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const invite = async (
  req: CycleRequest<{
    email: string
    name: string
    role: RoleName
    lang: Lang
  }>,
  res: Response
) => {
  try {
    const { countryIso, assessmentName, cycleName, email, name, role: roleName, lang } = req.query

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
      lang,
    })

    Requests.sendOk(res, invitedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

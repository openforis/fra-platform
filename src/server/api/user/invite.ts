import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

type InviteUserRequest = CycleRequest<{
  email: string
  lang: Lang
  name: string
  role: RoleName
  surname: string
}>

export const invite = async (req: InviteUserRequest, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, email, name, surname, role: roleName, lang } = req.query

    const user = Requests.getUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { countryIso, assessment, cycle, name, surname, email, roleName, user, lang }
    const { user: invitedUser } = await UserController.invite(props)

    Requests.sendOk(res, invitedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

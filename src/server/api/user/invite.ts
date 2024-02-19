import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { Lang } from 'meta/lang'
import { CollaboratorPermissions, RoleName } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

type InviteUserRequest = CycleRequest<
  {
    email: string
    lang: Lang
    name: string
    role: RoleName
    surname: string
  },
  { permissions?: CollaboratorPermissions }
>

export const invite = async (req: InviteUserRequest, res: Response) => {
  try {
    const { assessmentName, countryIso, cycleName, email, lang, name, role: roleName, surname } = req.query

    const { permissions } = req.body

    const user = Requests.getUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, countryIso, cycle, email, lang, name, permissions, roleName, surname, user }
    const { user: invitedUser } = await UserController.invite(props)

    Requests.sendOk(res, invitedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

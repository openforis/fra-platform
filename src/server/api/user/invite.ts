import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { UserInvitationForm } from 'meta/form/userInvitation/form'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

type InviteUserRequest = CycleRequest<unknown, UserInvitationForm>

export const invite = async (req: InviteUserRequest, res: Response) => {
  try {
    const { assessmentName, countryIso, cycleName } = req.query
    const userInvitation = req.body
    const user = Requests.getUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const { user: invitedUser } = await UserController.invite({ assessment, countryIso, cycle, user, userInvitation })

    Requests.sendOk(res, invitedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

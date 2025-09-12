import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { UserInvitationForm } from 'meta/form/userInvitation/form'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

type InviteUserRequest = CycleRequest<unknown, UserInvitationForm>

export const invite = async (req: InviteUserRequest, res: Response): Promise<void> => {
  try {
    const user = Requests.getUser(req)
    const userInvitation = req.body
    const { assessment, cycle } = req.context
    const { countryIso } = req.query

    const { user: invitedUser } = await UserController.invite({ assessment, countryIso, cycle, user, userInvitation })

    Requests.sendOk(res, invitedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

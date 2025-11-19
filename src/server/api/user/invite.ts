import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'
import { UserInvitationForm } from 'meta/form/userInvitation/form'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

type InviteUserRequest = CountryRequest<unknown, UserInvitationForm>

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

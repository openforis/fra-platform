import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const acceptInvitation = async (
  req: CountryRequest<{ invitationUuid: string }>,
  res: Response
): Promise<void> => {
  try {
    const { invitationUuid } = req.query

    const { user, userInvitation } = await UserController.findByInvitation({ invitationUuid })

    const uuid = userInvitation.assessmentUuid
    const { cycleUuid } = userInvitation
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ uuid, cycleUuid })

    const acceptedUser = await UserController.acceptInvitation({ assessment, cycle, user, userInvitation })

    Requests.sendOk(res, {
      user: acceptedUser,
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

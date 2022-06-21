import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'

export const sendInvitationEmail = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, invitationUuid } = req.query as {
      countryIso: CountryIso
      assessmentName: AssessmentName
      cycleName: string
      invitationUuid: string
    }

    const user = Requests.getRequestUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    await UserController.sendInvitationEmail({
      countryIso,
      assessment,
      cycle,
      invitationUuid,
      user,
      url: '',
    })

    Requests.sendOk(res, null)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

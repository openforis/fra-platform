import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { MessageCenterController } from '@server/controller/messageCenter'
import Requests from '@server/utils/requests'

export const getUnreadMessages = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, key } = req.query as {
      countryIso: CountryIso
      assessmentName: AssessmentName
      cycleName: string
      key: string
    }
    const user = Requests.getRequestUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const { unreadMessages } = await MessageCenterController.getUnreadMessages({
      countryIso,
      assessment,
      cycle,
      key,
      user,
    })

    Requests.sendOk(res, unreadMessages)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

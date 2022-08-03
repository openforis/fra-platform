import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { MessageCenterController } from '@server/controller/messageCenter'
import Requests from '@server/utils/requests'

export const getCountryMessageBoardUnreadMessages = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = req.query as {
      countryIso: CountryIso
      assessmentName: AssessmentName
      cycleName: string
    }
    const user = Requests.getRequestUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const data = await MessageCenterController.getUnreadMessages({ countryIso, assessment, cycle, user })

    Requests.sendOk(res, data)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

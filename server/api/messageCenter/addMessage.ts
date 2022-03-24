import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { MessageCenterController } from '@server/controller/messageCenter'
import { CountryIso } from '@core/country'
import { AssessmentController } from '@server/controller/assessment'

export const addMessage = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, key } = <Record<string, string>>req.query
    const { message } = req.body
    const user = Requests.getRequestUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      name: assessmentName,
      cycleName,
    })

    await MessageCenterController.addMessage({
      message,
      user,
      countryIso: countryIso as CountryIso,
      assessment,
      cycle,
      key,
    })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

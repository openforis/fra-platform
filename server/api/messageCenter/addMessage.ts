import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { MessageCenterController } from '@server/controller/messageCenter'
import { CountryIso } from '@core/country'
import { AssessmentController } from '@server/controller/assessment'

export const addMessage = async (req: Request, res: Response) => {
  const { countryIso, assessmentName, cycleName, key } = req.query
  const { message } = req.body
  const user = Requests.getRequestUser(req)
  try {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      name: String(assessmentName),
      cycleName: String(cycleName),
    })

    await MessageCenterController.addMessage({
      message,
      user,
      countryIso: countryIso as CountryIso,
      assessment,
      cycle,
      key: String(key),
    })

    res.send({})
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

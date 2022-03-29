import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller/assessment'
import { MessageCenterController } from '@server/controller/messageCenter'
import { CountryIso } from '@core/country'

export const getTopic = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, key } = <Record<string, string>>req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const topic = await MessageCenterController.getTopic({
      countryIso: countryIso as CountryIso,
      assessment,
      cycle,
      key,
    })

    Requests.sendOk(res, topic)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

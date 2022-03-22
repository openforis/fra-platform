import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { MessageCenterController } from '@server/controller/messageCenter'
import { CountryIso } from '@core/country'

export const getTopic = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, key } = req.query

    const topic = await MessageCenterController.getTopic({
      countryIso: countryIso as CountryIso,
      assessmentName: String(assessmentName),
      cycleName: String(cycleName),
      key: String(key),
    })

    Requests.sendOk(res, topic)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

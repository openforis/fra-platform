import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { MessageCenterController } from '@server/controller/messageCenter'
import { CountryIso } from '@core/country'

export const getTopic = async (req: Request, res: Response) => {
  const { countryIso, assessmentName, cycleName } = req.query
  try {
    const topic = await MessageCenterController.getTopic({
      countryIso: countryIso as CountryIso,
      assessmentName: String(assessmentName),
      cycleName: String(cycleName),
    })
    res.send(topic)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}

import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller'
import { AssessmentName } from '@meta/assessment'
import { MailService } from '@server/service'
import { CountryIso } from '@meta/area'

export const postCountryStatus = async (req: Request, res: Response) => {
  const { countryIso, name, cycleName } = req.params
  const { countryStatus, message } = req.body
  const { notifyUsers } = req.query
  try {
    const returnedCountryStatus = await AssessmentController.updateCountryStatus({
      countryStatus,
      countryIso,
      name: name as AssessmentName,
      cycleName,
    })

    if (notifyUsers) {
      await MailService.assessmentNotifyUsers({
        user: Requests.getRequestUser(req),
        countryIso: countryIso as CountryIso,
        countryStatus: returnedCountryStatus,
        url: Requests.serverUrl(req),
        assessmentName: name as AssessmentName,
        message,
      })
    }

    Requests.send(res, returnedCountryStatus)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
